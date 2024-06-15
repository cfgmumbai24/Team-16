import uvicorn,os 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import get_similarity_score
from urllib.parse import unquote
import numpy as np  
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/ai/{image_url}/{category}}')
def sellers(image_url: str, category: str):
    image_url = unquote(image_url)
    images = os.listdir(f'images/{category}')
    scores = {}
    for image in images:
        x = get_similarity_score(image_url,f'images/{category}/{image}')
        scores[image] = x.item()
    scores = dict(sorted(scores.items(), key=lambda item: item[1], reverse=True)[:5])
    return scores

# if __name__ == "__main__":
#     uvicorn.run("server:app",reload = True,host="127.0.0.1",port=1305)