from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import products, customers, orders

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory & Order Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {"message": "Inventory API is running"}

@app.get("/dashboard")
def dashboard(db=None):
    from sqlalchemy.orm import Session
    from database import SessionLocal
    db = SessionLocal()
    return {
        "total_products": db.query(models.Product).count(),
        "total_customers": db.query(models.Customer).count(),
        "total_orders": db.query(models.Order).count(),
        "low_stock": [
            {"id": p.id, "name": p.name, "quantity": p.quantity}
            for p in db.query(models.Product).filter(models.Product.quantity < 5).all()
        ]
    }