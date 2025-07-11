import json
from pymongo import MongoClient
from bson import ObjectId

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Update with your connection string
db = client['clothing_store']  # Update with your database name
collection = db['product']  # Update with your collection name

# Path to the JSON file
file_path = 'updated_products.json'

# Read the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

# Process the data
if isinstance(data, dict):
    # If it's a single object
    if 'user_id' in data:
        # Convert user_id to userId with ObjectId type
        user_id_value = data.pop('user_id')
        data['userId'] = ObjectId(user_id_value)
        
        # Insert or update in MongoDB
        collection.update_one(
            {'_id': data.get('_id', ObjectId())},  # Use existing _id or create new one
            {'$set': data},
            upsert=True
        )
else:
    # If it's an array of objects
    for item in data:
        if 'user_id' in item:
            # Convert user_id to userId with ObjectId type
            user_id_value = item.pop('user_id')
            item['userId'] = ObjectId(user_id_value)
            
            # Insert or update in MongoDB
            collection.update_one(
                {'_id': item.get('_id', ObjectId())},  # Use existing _id or create new one
                {'$set': item},
                upsert=True
            )

print("Successfully updated the data in MongoDB. Changed 'user_id' to 'userId' and converted to ObjectId type.")
