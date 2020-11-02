from typing import Optional, List
from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl
from tortoise.contrib.fastapi import HTTPNotFoundError
from models import MyApi_Pydantic, MyApisIn_Pydantic, MyApis

router = APIRouter()


class Status(BaseModel):
    message: str


@router.get("/list-myapi", response_model=List[MyApi_Pydantic])
async def list_myapi():
    return await MyApi_Pydantic.from_queryset(MyApis.all())

@router.post("/create-myapi", response_model=MyApi_Pydantic)
async def create_myapi(myapi: MyApisIn_Pydantic):
    myapi_obj = await MyApis.create(**myapi.dict(exclude_unset=True))
    return await MyApi_Pydantic.from_tortoise_orm(myapi_obj)

@router.get(
    "/myapi/{myapi_id}", response_model=MyApi_Pydantic, responses={404: {"model": HTTPNotFoundError}}
)
async def get_myapi(myapi_id: int):
    return await MyApi_Pydantic.from_queryset_single(MyApis.get(id=myapi_id))

@router.put(
    "/myapi/{myapi_id}", response_model=MyApi_Pydantic, responses={404: {"model": HTTPNotFoundError}}
)
async def update_myapi(myapi_id: int, myapi: MyApisIn_Pydantic):
    await MyApis.filter(id=myapi_id).update(**myapi.dict(exclude_unset=True))
    return await MyApi_Pydantic.from_queryset_single(MyApis.get(id=myapi_id))

@router.delete("/myapi/{myapi_id}", response_model=Status, responses={404: {"model": HTTPNotFoundError}})
async def delete_myapi(myapi_id: int):
    deleted_count = await MyApis.filter(id=myapi_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"MyApi {myapi_id} not found")
    return Status(message=f"Deleted myapi {myapi_id}")
