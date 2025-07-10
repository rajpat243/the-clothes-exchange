import json
import random

tops_names = [
    "Classic Cotton T-Shirt", "Striped Polo", "Button-Down Oxford", "Casual Henley",
    "V-Neck Sweater", "Crewneck Sweatshirt", "Denim Jacket", "Flannel Shirt",
    "Graphic Tee", "Hoodie", "Long Sleeve Thermal", "Linen Shirt",
    "Patterned Blouse", "Silk Camisole", "Tank Top", "Turtleneck",
    "Cardigan", "Crop Top", "Off-Shoulder Blouse", "Tunic"
]

bottoms_names = [
    "Slim Fit Jeans", "Chino Pants", "Cargo Shorts", "Athletic Joggers",
    "Pleated Skirt", "Denim Shorts", "Khaki Pants", "Linen Trousers",
    "Pencil Skirt", "Corduroy Pants", "Leather Leggings", "Maxi Skirt",
    "Bermuda Shorts", "Dress Pants", "Distressed Jeans", "A-Line Skirt",
    "Culottes", "High-Waisted Jeans", "Track Pants", "Palazzo Pants"
]

shoes_names = [
    "Classic Sneakers", "Leather Loafers", "Canvas Slip-Ons", "Running Shoes",
    "Ankle Boots", "Dress Oxfords", "Sandals", "High Heels",
    "Hiking Boots", "Ballet Flats", "Chelsea Boots", "Espadrilles",
    "Moccasins", "Platform Sneakers", "Flip Flops", "Derby Shoes",
    "Wedge Heels", "Combat Boots", "Boat Shoes", "Stilettos"
]

accessories_names = [
    "Leather Belt", "Knit Beanie", "Silk Scarf", "Statement Necklace",
    "Aviator Sunglasses", "Leather Wallet", "Woven Hat", "Canvas Backpack",
    "Stud Earrings", "Wristwatch", "Crossbody Bag", "Leather Gloves",
    "Baseball Cap", "Tote Bag", "Bracelet Set", "Patterned Socks",
    "Bow Tie", "Clutch Purse", "Beret", "Pendant Necklace"
]


def generate_items(category, names, count=100, start_id=1):
    items = []
    for i in range(count):
        item = {
            "id": start_id + i, 
            "category": category,
            "title": random.choice(names),
            "price": round(random.uniform(9.99, 199.99), 2)  
        }
        items.append(item)
    return items


# Generate items with sequential IDs
tops = generate_items("top", tops_names, 100, 1)
bottoms = generate_items("bottom", bottoms_names, 100, 101)
shoes = generate_items("shoes", shoes_names, 100, 201)
accessories = generate_items("accessory", accessories_names, 100, 301)

# Create individual category files
with open("tops.json", "w") as f:
    json.dump(tops, f, indent=2)

with open("bottoms.json", "w") as f:
    json.dump(bottoms, f, indent=2)

with open("shoes.json", "w") as f:
    json.dump(shoes, f, indent=2)

with open("accessories.json", "w") as f:
    json.dump(accessories, f, indent=2)

# Combine all products into one array
all_products = tops + bottoms + shoes + accessories

# Create the combined products file
with open("products.json", "w") as f:
    json.dump(all_products, f, indent=2)

print("JSON files created successfully!")
