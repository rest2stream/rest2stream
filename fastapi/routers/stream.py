import aiohttp
import jsonpatch
import json
import asyncio
from sse_starlette.sse import EventSourceResponse
from fastapi import APIRouter

router = APIRouter()

session = None

@router.on_event('startup')
async def startup_event():
    global session
    session = aiohttp.ClientSession()

@router.on_event('shutdown')
async def shutdown_event():
    await session.close()

async def event_generator(stream_url):
    initial_data = []
    while True:
        async with session.get(stream_url) as response:
            data = await response.json()
            patch_data = jsonpatch.make_patch(initial_data, data)
            if not initial_data:
                #first data set
                yield {
                    "event": "data",
                    "data": json.dumps(data)
                }
            elif patch_data:
                #when change happen?
                print (patch_data)
                yield {
                    "event": "patch",
                    "data": json.dumps(list(patch_data))
                }
            initial_data = data

        await asyncio.sleep(2) #2 seconds


@router.get("/{url:path}")
async def stream(url):
    stream_url = 'http://localhost:8000/myapi/1' #temporary
    eg = event_generator(stream_url)
    return EventSourceResponse(eg)