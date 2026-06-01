from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int

class ProductOut(ProductCreate):
    id: int
    class Config:
        from_attributes = True

class CustomerCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class CustomerOut(CustomerCreate):
    id: int
    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: int
    customer_id: int
    total: float
    created_at: datetime
    items: List[OrderItemOut]
    class Config:
        from_attributes = True