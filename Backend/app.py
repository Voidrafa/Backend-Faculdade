from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# MongoDB client setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["shopping_db"]
products_collection = db["products"]
cart_collection = db["cart"]

# Utility function to serialize MongoDB ObjectId
def serialize_item(item):
    item["_id"] = str(item["_id"])
    return item

# -------------------- Product Routes --------------------

# Create a new product
@app.route("/products", methods=["POST"])
def create_product():
    data = request.json
    if not data.get("name") or not data.get("price"):
        return jsonify({"error": "Product name and price are required"}), 400
    
    product = {
        "name": data["name"],
        "price": data["price"],
        "description": data.get("description", "")
    }
    result = products_collection.insert_one(product)
    return jsonify({"message": "Product created", "product_id": str(result.inserted_id)}), 201

# Retrieve all products
@app.route("/products", methods=["GET"])
def get_products():
    products = [serialize_item(p) for p in products_collection.find()]
    return jsonify(products), 200


# Retrieve a single product by ID
@app.route("/products/<product_id>", methods=["GET"])
def get_product(product_id):
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(serialize_item(product)), 200

# Update a product by ID
@app.route("/products/<product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.json
    update_data = {k: v for k, v in data.items() if k in ["name", "price", "description"]}
    
    result = products_collection.update_one({"_id": ObjectId(product_id)}, {"$set": update_data})
    if result.matched_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product updated"}), 200

# Delete a product by ID
@app.route("/products/<product_id>", methods=["DELETE"])
def delete_product(product_id):
    result = products_collection.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Product not found"}), 404
    return jsonify({"message": "Product deleted"}), 200

# -------------------- Cart Routes --------------------

# Add a product to the cart
@app.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.json
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        return jsonify({"error": "Product not found"}), 404

    # Check if product is already in cart
    cart_item = cart_collection.find_one({"product_id": ObjectId(product_id)})
    if cart_item:
        cart_collection.update_one(
            {"product_id": ObjectId(product_id)},
            {"$inc": {"quantity": quantity}}
        )
    else:
        cart_item = {
            "product_id": ObjectId(product_id),
            "name": product["name"],
            "price": product["price"],
            "quantity": quantity
        }
        cart_collection.insert_one(cart_item)

    return jsonify({"message": "Product added to cart"}), 201

# Get all items in the cart
@app.route("/cart", methods=["GET"])
def get_cart_items():
    cart_items = [serialize_item(item) for item in cart_collection.find()]
    return jsonify(cart_items), 200

# Update a product's quantity in the cart
@app.route("/cart/<product_id>", methods=["PUT"])
def update_cart_item(product_id):
    data = request.json
    quantity = data.get("quantity")
    
    if not quantity or quantity < 1:
        return jsonify({"error": "Quantity must be a positive integer"}), 400
    
    result = cart_collection.update_one(
        {"product_id": ObjectId(product_id)},
        {"$set": {"quantity": quantity}}
    )
    
    if result.matched_count == 0:
        return jsonify({"error": "Product not in cart"}), 404
    return jsonify({"message": "Cart item updated"}), 200

# Remove a product from the cart
@app.route("/cart/<product_id>", methods=["DELETE"])
def remove_from_cart(product_id):
    result = cart_collection.delete_one({"product_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Product not in cart"}), 404
    return jsonify({"message": "Product removed from cart"}), 200

# Clear the entire cart
@app.route("/cart", methods=["DELETE"])
def clear_cart():
    cart_collection.delete_many({})
    return jsonify({"message": "Cart cleared"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
