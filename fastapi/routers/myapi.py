from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl

router = APIRouter()

class MyApi(BaseModel):
    name: str
    description: Optional[str] = None
    polling_frequency: int
    url: HttpUrl
    http_headers: Optional[str] = None
    query_params: Optional[str] = None


@router.post('/items')
async def create_item(myapi: MyApi):
    return {'results': myapi}


@router.get('/get-api/{user_id}')
async def get_api(user_id: int, nice: Optional[int] = None):
    return {'results': 'list of apis' }

@router.post('/new-api')
async def new_api(api: MyApi):
    return {'results': 'created'}

@router.post('/edit-api')
async def edit_api():
    return {'results': 'edited'}

@router.post('/delete-api')
async def delete_api():
    return {'results': 'deleted'}
