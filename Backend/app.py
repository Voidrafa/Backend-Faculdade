from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://mongo:27017/mydatabase'
mongo = PyMongo(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = mongo.db.users.find_one({'username': data['username']})
    return jsonify({'message': 'Login successful!'}) if user else jsonify({'message': 'User not found!'}), 404

if __name__ == '__main__':
    app.run(debug=True)
