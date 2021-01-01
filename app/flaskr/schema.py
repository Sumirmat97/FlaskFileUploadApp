from marshmallow import Schema, fields


class FileUploadSuccessResponse(Schema):
    fileName = fields.Str(required=True)


class FileUploadErrorResponse(Schema):
    error = fields.Str(required=True)
