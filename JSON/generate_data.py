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

# Description templates for each category
top_descriptions = [
    "Made from premium {material} for all-day comfort. Perfect for casual outings or layering in cooler weather.",
    "This versatile {material} top features a flattering fit and timeless design. Pairs well with jeans or dress pants.",
    "Soft and breathable {material} construction with stylish details. Great for both work and weekend wear.",
    "Crafted from high-quality {material} that's built to last. The perfect addition to your everyday wardrobe.",
    "Featuring a modern cut and {material} fabric that feels luxurious against your skin. Available in multiple colors."
]

bottom_descriptions = [
    "These {material} bottoms offer both style and comfort for everyday wear. Features practical pockets and a flattering fit.",
    "Made from durable {material} that holds its shape all day. Perfect for work, casual outings, or special occasions.",
    "These versatile bottoms are crafted from premium {material} for lasting quality. Designed with comfort and style in mind.",
    "Featuring a contemporary fit and {material} construction that moves with you. A wardrobe essential for any season.",
    "These bottoms combine classic style with modern {material} fabric. Comfortable enough for all-day wear."
]

shoes_descriptions = [
    "These {material} shoes provide exceptional comfort and support for all-day wear. Features a durable sole and quality craftsmanship.",
    "Crafted from premium {material} with attention to detail. The perfect balance of style and functionality.",
    "These versatile shoes feature {material} construction and ergonomic design. Suitable for various occasions and outfits.",
    "Made from high-quality {material} that molds to your feet for personalized comfort. Designed to last for years.",
    "These stylish shoes combine {material} uppers with cushioned insoles for maximum comfort. A must-have for your collection."
]

accessories_descriptions = [
    "This {material} accessory adds the perfect finishing touch to any outfit. Features quality construction and timeless design.",
    "Made from premium {material} that's built to last. Versatile enough to complement both casual and formal looks.",
    "This stylish accessory is crafted from high-quality {material} with attention to detail. An essential addition to your collection.",
    "Featuring elegant {material} construction and practical functionality. Designed to elevate your everyday style.",
    "This {material} accessory combines classic design with modern sensibility. Perfect for adding personality to any ensemble."
]

materials = {
    "top": ["cotton", "linen", "silk", "wool blend", "polyester", "jersey knit", "organic cotton", "modal", "rayon"],
    "bottom": ["denim", "cotton twill", "wool", "linen blend", "corduroy", "stretch fabric", "khaki", "polyester blend", "leather"],
    "shoes": ["leather", "suede", "canvas", "synthetic", "mesh", "nubuck", "patent leather", "vegan leather", "textile"],
    "accessory": ["genuine leather", "sterling silver", "cotton blend", "stainless steel", "acrylic", "wool", "silk", "recycled materials", "brass"]
}

def generate_description(category):
    if category == "top":
        template = random.choice(top_descriptions)
        material = random.choice(materials["top"])
    elif category == "bottom":
        template = random.choice(bottom_descriptions)
        material = random.choice(materials["bottom"])
    elif category == "shoes":
        template = random.choice(shoes_descriptions)
        material = random.choice(materials["shoes"])
    else:  # accessory
        template = random.choice(accessories_descriptions)
        material = random.choice(materials["accessory"])
    
    return template.format(material=material)

def generate_items(category, names, count=100):
    items = []
    for i in range(count):
        item = {
            "category": category,
            "title": random.choice(names),
            "price": round(random.uniform(9.99, 199.99), 2),
            "description": generate_description(category)
        }
        items.append(item)
    return items


# Generate items without ID fields
tops = generate_items("top", tops_names, 100)
bottoms = generate_items("bottom", bottoms_names, 100)
shoes = generate_items("shoes", shoes_names, 100)
accessories = generate_items("accessory", accessories_names, 100)

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
