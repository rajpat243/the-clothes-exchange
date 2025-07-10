import json
from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"  
DB_NAME = "clothing_store" 

def load_json_to_mongodb(file_path, collection_name):
    try:

        with open(file_path, 'r') as file:
            data = json.load(file)
        

        result = collection.insert_many(data)
        print(f"Successfully inserted {len(result.inserted_ids)} documents into {collection_name} collection")
    except Exception as e:
        print(f"Error loading {file_path} into {collection_name}: {e}")

try:
   
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    print(f"Connected to MongoDB database: {DB_NAME}")
    
    
    collections_data = [
        {"name": "tops", "file": "tops.json"},
        {"name": "bottoms", "file": "bottoms.json"},
        {"name": "shoes", "file": "shoes.json"},
        {"name": "accessories", "file": "accessories.json"},
        {"name": "product", "file": "products.json"}
    ]
    
    
    for item in collections_data:
        collection = db[item["name"]]
        
    
        collection.drop()
        print(f"Dropped existing {item['name']} collection")
        
    
        load_json_to_mongodb(item["file"], item["name"])
    
    print("\nAll data loaded successfully!")
    
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
finally:
    if 'client' in locals():
        client.close()
        print("MongoDB connection closed")
