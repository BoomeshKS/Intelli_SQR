from flask import Flask, request, jsonify
from flask_cors import CORS
from bson.objectid import ObjectId
from pymongo import MongoClient
import traceback

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb://localhost:27017/')
db = client['Employee_Data']  # Change 'your_database_name' to your actual database name
collection = db['Employee_Details']  






@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming data is sent in JSON format
    collection.insert_one(data)
    print("Received data:", data)
    return jsonify({"message": "Data received successfully"})


@app.route('/receive_data', methods=['GET'])
def fetch_data():
    data = list(collection.find())
    # data = json.dumps(data)
    for item in data:
        item['_id'] = str(item['_id'])
    return jsonify(data)

@app.route('/delete_employee/<employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    try:
        # Convert employee_id from string to ObjectId
        obj_id = ObjectId(employee_id)
        # Delete the employee from the collection
        result = collection.delete_one({'_id': obj_id})
        if result.deleted_count == 1:
            return jsonify({"message": "Employee deleted successfully"}), 200
        else:
            return jsonify({"error": "Employee not found"}), 404
    except Exception as e:
        traceback.print_exc() 
        return jsonify({"error": str(e)}), 500
    




@app.route('/update_employee/<employee_id>', methods=['PUT'])
def update_employee(employee_id):
    try:
        # Convert employee_id from string to ObjectId
        obj_id = ObjectId(employee_id)
        # Get the new data from the request body
        new_data = request.json
        # Update the employee in the collection
        result = collection.update_one({'_id': obj_id}, {'$set': new_data})
        if result.modified_count == 1:
            return jsonify({"message": "Employee updated successfully"}), 200
        else:
            return jsonify({"error": "Employee not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True)
