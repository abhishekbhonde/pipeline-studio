from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import pipeline

app = FastAPI(title="Pipeline Studio Pipeline API")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(pipeline.router, prefix="/pipelines", tags=["Pipelines"])

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

