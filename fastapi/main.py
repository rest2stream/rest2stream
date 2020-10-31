from fastapi import FastAPI
from routers import myapi

app = FastAPI()

app.include_router(myapi.router)


