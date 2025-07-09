import { Link } from "react-router-dom";

function FreeFindsSection() {

  {/*Hard Coded Items (Replace with Backend API Database ) */}
  const items = [
    { title: "Zara Puffer Jacket", tag: "Free • Upcycle this" },
    { title: "Vintage Shorts", tag: "Free • Gift this" },
    { title: "Casual Floral Dress", tag: "Free" },
  ];

  return (
    <section className="free-section">
      <h2 className="section-title">🆓 Free Finds Near You</h2>
      <div className="free-grid">
        {items.map((item, i) => (
          <div key={i} className="card">
            <img src="https://via.placeholder.com/150" alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.tag}</p>
          </div>
        ))}
      </div>
      <Link to="/browse" className="see-all-link">
        See All Free Items →
      </Link>
    </section>
  );
}

export default FreeFindsSection;
