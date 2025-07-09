import "../styles/ItemCard.css";

function ItemCard({ title, tag, image }) {
    return (
      <div className="item-card">
        <img src={image} alt={title} className="item-image" />
        <h3 className="item-title">{title}</h3>
        <p className="item-tag">{tag}</p>
      </div>
    );
  }
  
  export default ItemCard;
  