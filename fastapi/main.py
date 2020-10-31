from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from routers import myapi

app = FastAPI()

app.include_router(myapi.router)

register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True
)

