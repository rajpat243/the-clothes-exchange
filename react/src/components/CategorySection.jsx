
function CategorySection() {
    const categories = ["Tops", "Bottoms", "Shoes", "Accessories", "All"];
  
    return (
      <section className="category-section">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button key={cat} className="category-button">
              {cat}
            </button>
          ))}
        </div>
      </section>
    );
  }
  
  export default CategorySection;
  