import os

from werkzeug.utils import secure_filename

from .configs import configs
from .schema import FileUploadErrorResponse, FileUploadSuccessResponse


class FileUploadService(object):

    def __init__(self, user_id):
        self.user_id = user_id

        if not user_id:
            raise Exception('user id not provided')

    def save_file(self, files):
        try:
            if 'file' not in files:
                return FileUploadErrorResponse().load({'error': 'No file part'})
            file = files['file']
            if file.filename == '':
                return FileUploadErrorResponse().load({'error': 'No selected file'})
            if file and self.allowed_file(file.filename):
                fileName = secure_filename(file.filename)
                filePath = os.path.join(configs['UPLOAD_FOLDER'], fileName)
                print(filePath)
                file.save(filePath)
                return FileUploadSuccessResponse().load({'fileName': fileName})
            else:
                return FileUploadErrorResponse().load({'error': 'File format not supported!'})
        except:
            return FileUploadErrorResponse().load({'error': 'File could not be uploaded!'})

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in configs['ALLOWED_EXTENSIONS']
