from fastapi import FastAPI
from typing import List, Optional
from pydantic import BaseModel
from deta import Deta

deta = Deta('b063huxq_puJ1My3CiVDT3UfH5BWG5wKWuHt7Q2es')
db = deta.Base('products')
session = deta.Base('sessions')

app = FastAPI(root_path='/api/')

class Product(BaseModel):
    key: str
    name: str
    price: float

class Products(BaseModel):
    products: List[Product]

class AddProduct(BaseModel):
    name: str
    price: float

class EditProduct(BaseModel):
    key: str
    name: Optional[str] = None
    price: Optional[float] = None

class DeleteProduct(BaseModel):
    key: Optional[str] = 'product_key'
    deleted: Optional[bool] = True


@app.get("/get_products", response_model=Products)
async def get_product():
    products = db.fetch()
    return Products(**{"products":products.items})    

@app.post("/add_product", response_model=Product)
async def add_product(product:AddProduct):
    added = {"key":'already_exists', 'name':'product not added', 'price':0}
    try:
        added = db.insert(dict(product))
    except:
        pass

    return Product(**added)

@app.put("/edit_product", response_model=Product)
async def edit_product(product:EditProduct):
    added = {"key":"missing key", 'name':'product not found', 'price':0}
    if product.key:
        if product.name:
            db.update({'name': product.name}, product.key)
        elif product.price:
            db.update({'price': product.price}, product.key)
        else:
            added = {"key":product.key, 'name':'no product name given (need name and/or price)', 'price':'no pirce given (need name and/or price)'}
        added = db.get(product.key)

    return Product(**added)

@app.delete("/delete_product", response_model=DeleteProduct)
async def delete_product(product:DeleteProduct):
    if product.key:
        product = db.delete(product.key)

    return DeleteProduct()