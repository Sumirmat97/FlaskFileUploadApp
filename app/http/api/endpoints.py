from .middlewares import login_required
from flask import Flask, json, g, request
from app.kudo.service import Service as fileService
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/uploadFile", methods=["POST"])
@login_required
def uploadFile():
    return json_response(fileService(g.user).saveFile(request.data))


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
