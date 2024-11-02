from flask import Flask, jsonify, request
from pymongo import MongoClient
import os

app = Flask(__name__)

# Conexão com MongoDB via variável de ambiente
client = MongoClient(os.getenv("MONGO_URI"))
db = client["shopping_db"]
cart_collection = db["cart"]

products = [
    {"id": 1, "name": "Produto A", "price": 10.0},
    {"id": 2, "name": "Produto B", "price": 20.0},
    {"id": 3, "name": "Produto C", "price": 30.0}
]

@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)

@app.route("/cart", methods=["GET"])
def get_cart():
    cart_items = list(cart_collection.find({}, {"_id": 0}))
    return jsonify(cart_items)

@app.route("/cart", methods=["POST"])
def add_to_cart():
    product_id = int(request.json["product_id"])
    product = next((p for p in products if p["id"] == product_id), None)
    if product:
        cart_collection.insert_one(product)
    return jsonify({"status": "success"})

@app.route("/cart", methods=["DELETE"])
def remove_from_cart():
    product_id = int(request.json["product_id"])
    cart_collection.delete_one({"id": product_id})
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
