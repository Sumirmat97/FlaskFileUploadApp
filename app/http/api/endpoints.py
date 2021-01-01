import os

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .middlewares import login_required
from flask import Flask, json, g, request
from app.flaskr.service import FileUploadService as fileUploadService
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['MAX_CONTENT_LENGTH']: 50 * 1024 * 1024  # restricting max size as 50MB

limiter = Limiter(
    app, key_func=get_remote_address
)

CORS(app)


@app.route("/uploadFile", methods=["POST"])
@login_required
@limiter.limit("5 per minute")
def upload_file():
    return json_response(fileUploadService(g.user).save_file(request.files))


@app.errorhandler(429)
def ratelimit_handler(e):
    return json_response({'error': "API call rate limit exceeded: %s" % e.description}, 429)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
