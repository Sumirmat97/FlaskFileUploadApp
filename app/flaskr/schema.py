from marshmallow import Schema, fields


class FileUploadResponse(Schema):
    fileName = fields.Str(required=True)
