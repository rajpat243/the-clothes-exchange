import json
import pymongo
from pymongo import MongoClient

# Part 1: Create JSON file with dummy users
def create_users_json():
    # Define dummy users (increased to 40 users)
    users = [
        {
            "name": "Raj",
            "email": "raj@example.com",
            "password": "password123"
        },
        {
            "name": "Jin",
            "email": "jin@example.com",
            "password": "securepass456"
        },
        {
            "name": "Luo",
            "email": "luo@example.com",
            "password": "mysecret789"
        }
    ]
    
    # Add 37 more users with the pattern user4, user5, etc.
    for i in range(4, 41):
        users.append({
            "name": f"user{i}",
            "email": f"user{i}@example.com",
            "password": "123456789"
        })
    
    # Write to JSON file
    with open('dummy_users.json', 'w') as f:
        json.dump(users, f, indent=2)
    
    print("JSON file 'dummy_users.json' created successfully!")
    return users

# Part 2: Add users to MongoDB
def add_users_to_mongodb(users):
    try:
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017/')
        
        # Create or access the database
        db = client['clothing_store']
        
        # Create or access the users collection
        users_collection = db['user']
        
        # Check if collection already has data
        if users_collection.count_documents({}) > 0:
            print("Clearing existing users collection...")
            users_collection.delete_many({})
        
        # Insert the users
        result = users_collection.insert_many(users)
        
        print(f"Added {len(result.inserted_ids)} users to MongoDB successfully!")
        print(f"User IDs: {result.inserted_ids}")
        
    except pymongo.errors.ConnectionFailure:
        print("Failed to connect to MongoDB. Make sure MongoDB is running.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Main execution
if __name__ == "__main__":
    print("Creating dummy users JSON file...")
    users = create_users_json()
    
    print("\nAdding users to MongoDB...")
    add_users_to_mongodb(users)
    
    print("\nProcess completed!")
