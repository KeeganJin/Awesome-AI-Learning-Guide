from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Lightweight FastAPI Backend")

# Allow local frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = ""


_items: List[Item] = []
_next_id = 1


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/items", response_model=List[Item])
def list_items():
    return _items


@app.post("/api/items", response_model=Item)
def create_item(item: Item):
    global _next_id
    item.id = _next_id
    _next_id += 1
    _items.append(item)
    return item


@app.get("/api/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    for it in _items:
        if it.id == item_id:
            return it
    raise HTTPException(status_code=404, detail="Not found")


@app.put("/api/items/{item_id}", response_model=Item)
def update_item(item_id: int, item: Item):
    for idx, it in enumerate(_items):
        if it.id == item_id:
            item.id = item_id
            _items[idx] = item
            return item
    raise HTTPException(status_code=404, detail="Not found")


@app.delete("/api/items/{item_id}")
def delete_item(item_id: int):
    for idx, it in enumerate(_items):
        if it.id == item_id:
            _items.pop(idx)
            return {"ok": True}
    raise HTTPException(status_code=404, detail="Not found")
