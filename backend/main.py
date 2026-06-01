from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# your routers go below here
from routers import products, customers, orders

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)