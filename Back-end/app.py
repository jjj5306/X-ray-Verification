from flask import Flask, request, jsonify, Response
import json, torch, numpy as np
import os, sys, PIL
from models import model
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Flask Pose Model API"

@app.route("/predict", methods=["POST"])
def predict():
    # logging
    print("\n=== Request headers ===")
    print(request.headers)
    
    print("=== Request files ===")
    print(request.files)

    if 'file' not in request.files:
        return jsonify({"error": "Invalid input provided"}), 400
    
    file = request.files['file']

    # logging
    print("\n\n=== File info ===")
    print(f"Filename: {file.filename}")
    print(f"Content Type: {file.content_type}")
    print(f"File Size: {len(file.read())} bytes")
    file.seek(0) 

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    print(f"\n- 예측 시작 {file.filename} -")
    image = PIL.Image.open(file).convert("RGB")

    # 2개의 모델 객체 초기화
    stage1_model = model.PoseModel()
    stage2_model = model.DetailedPoseModel()

    # 자세 탐지 모델
    output1 = stage1_model.predict(image)
    # 공통 + 세부 자세 탐지 모델
    forResult = stage2_model._get_class_name(output1)
    output2 = stage2_model.predict(output1, image)

    # 파일 이름 처리 수정
    image_name = secure_filename(file.filename)
    # 이미지를 저장
    output2[1].save(f"predicted/{image_name}")
    
    result_data = {"posture": forResult[0], "abnormal_codes": []}
    for item in output2[0]:
        if item["type"] == "cls" and item["result"] == 1:
            result_data["abnormal_codes"].append({"code": item['class_name'], "message": f"오류코드: {item['class_name']}이(가) 검출되었습니다."})
        elif item["type"] == "obj" and "Normal" not in item["class_name"]:
            result_data["abnormal_codes"].append({"code": item['class_name'], "message": f"오류코드: {item['class_name']}이(가) 검출되었습니다."})
    
    if not result_data["abnormal_codes"]:
        result_data["status"] = "success"
        result_data["message"] = "The X-ray image was captured successfully"
    else:
        result_data["status"] = "error"
        result_data["message"] = "Retake recommended"
    
    print(json.dumps(result_data, ensure_ascii=False, indent=4))
    
    return Response(
        json.dumps(result_data, ensure_ascii=False, indent=4),
        content_type="application/json; charset=utf-8"
)

if __name__ == "__main__":
    # 단일 서버로 실행할 때 port 번호는 여기에서 변경.
    # gunicorn 으로 실행할 때, port 번호는 gunicorn 명령어에서 변경.
    app.run(host="0.0.0.0", port=33333, threaded=True)
