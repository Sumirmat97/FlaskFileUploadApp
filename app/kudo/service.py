from .schema import FileUploadResponse


class Service(object):
    def __init__(self, user_id):
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")

    def saveFile(self, filePath):
        return FileUploadResponse().load(filePath)
