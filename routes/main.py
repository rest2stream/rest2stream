from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

routes = FastAPI()

class MyApi(BaseModel):
    name: str
    description: Optional[str] = None
    polling_frequency: int
    url: str
    http_headers: Optional[str] = None
    query_params: Optional[str] = None


@routes.post('/items')
async def create_item(myapi: MyApi):
    return {'results': myapi}


@routes.get('/get-api/{user_id}')
async def get_api(user_id: int, nice: Optional[int] = None):
    return {'results': 'list of apis' }

@routes.post('/new-api')
async def new_api(api: MyApi):
    return {'results': 'created'}

@routes.post('/edit-api')
async def edit_api():
    return {'results': 'edited'}

@routes.post('/delete-api')
async def delete_api():
    return {'results': 'deleted'}
