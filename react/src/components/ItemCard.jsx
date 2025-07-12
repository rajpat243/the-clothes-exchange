import { Link } from "react-router-dom";
import "../styles/ItemCard.css";

function ItemCard({ id, title, price, image, category, }) {
  const encodedTitle = encodeURIComponent(title); // handles spaces/special chars

  return (
    <Link to={`/item/${id}`} className="item-card-link">
      <div className="item-card">
        <img
          src={image}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{price}</p>


      </div>
    </Link>
  );
}

export default ItemCard;
