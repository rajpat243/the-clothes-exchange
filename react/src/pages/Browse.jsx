import ItemCard from "../components/ItemCard";
import "../styles/Browse.css";

function Browse() {
  const items = [
    {
      title: "Lightweight Hoodie",
      tag: "Free • Gift this",
      image: "https://via.placeholder.com/200x200?text=Hoodie",
    },
    {
      title: "Corduroy Pants",
      tag: "$10 • Upcycle this",
      image: "https://via.placeholder.com/200x200?text=Pants",
    },
    {
      title: "Denim Jacket",
      tag: "Free",
      image: "https://via.placeholder.com/200x200?text=Jacket",
    },
    {
      title: "Floral Skirt",
      tag: "$5",
      image: "https://via.placeholder.com/200x200?text=Skirt",
    },
  ];

  return (
    <div className="browse-page">
      <h2 className="browse-title">Browse All Items</h2>
      <div className="browse-grid">
        {items.map((item, i) => (
          <ItemCard
            key={i}
            title={item.title}
            tag={item.tag}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Browse;
