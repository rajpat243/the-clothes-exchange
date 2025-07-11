import { Link } from "react-router-dom";
import "../styles/ItemCard.css";

function ItemCard({ title,image,  tag, category  }) {
  const encodedTitle = encodeURIComponent(title); // handles spaces/special chars

  return (
    <Link to={`/item/${encodedTitle}`} className="item-card-link">
      <div className="item-card">
        <img
          src={image}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{tag}</p>


      </div>
    </Link>
  );
}

export default ItemCard;
