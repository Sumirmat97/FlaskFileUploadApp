import os

from flask import url_for
from werkzeug.utils import secure_filename

from __main__ import configs
from .schema import FileUploadResponse


class FileService(object):
    def __init__(self, user_id):
        self.user_id = user_id

        if not user_id:
            raise Exception('user id not provided')

    def save_file(self, files):
        if 'file' not in files:
            return 'No file part'
        file = files['file']
        if file.filename == '':
            return 'No selected file'
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(configs['UPLOAD_FOLDER'], filename))
        return FileUploadResponse().load(url_for('uploaded_file', filename=filename))

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in configs['ALLOWED_EXTENSIONS']
