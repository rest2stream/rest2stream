from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator

class MyApis(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50, null=True)
    description = fields.CharField(max_length=200, null=True)
    polling_frequency = fields.IntField()
    polling_unit = fields.IntField() #seconds/minute
    url = fields.CharField(max_length=100, null=True)
    http_headers = fields.CharField(max_length=100, null=True)
    query_params = fields.CharField(max_length=100, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

MyApi_Pydantic = pydantic_model_creator(MyApis, name="MyApi")
MyApisIn_Pydantic = pydantic_model_creator(MyApis, name="MyApiIn", exclude_readonly=True)