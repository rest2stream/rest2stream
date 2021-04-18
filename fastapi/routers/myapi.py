from typing import Optional, List
from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl
from tortoise.contrib.fastapi import HTTPNotFoundError
from models import MyApiPydantic, MyApisInPydantic, MyApis

router = APIRouter()


class Status(BaseModel):
    message: str


@router.get("/list-myapi", response_model=List[MyApiPydantic])
async def list_myapi():
    return await MyApiPydantic.from_queryset(MyApis.all())

@router.post("/create-myapi", response_model=MyApiPydantic)
async def create_myapi(myapi: MyApisInPydantic):
    myapi_obj = await MyApis.create(**myapi.dict(exclude_unset=True))
    return await MyApiPydantic.from_tortoise_orm(myapi_obj)

@router.get(
    "/myapi/{myapi_id}", response_model=MyApiPydantic, responses={404: {"model": HTTPNotFoundError}}
)
async def get_myapi(myapi_id: int):
    return await MyApiPydantic.from_queryset_single(MyApis.get(id=myapi_id))

@router.put(
    "/myapi/{myapi_id}", response_model=MyApiPydantic, responses={404: {"model": HTTPNotFoundError}}
)
async def update_myapi(myapi_id: int, myapi: MyApisInPydantic):
    await MyApis.filter(id=myapi_id).update(**myapi.dict(exclude_unset=True))
    return await MyApiPydantic.from_queryset_single(MyApis.get(id=myapi_id))

@router.delete("/myapi/{myapi_id}", response_model=Status, responses={404: {"model": HTTPNotFoundError}})
async def delete_myapi(myapi_id: int):
    deleted_count = await MyApis.filter(id=myapi_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"MyApi {myapi_id} not found")
    return Status(message=f"Deleted myapi {myapi_id}")
