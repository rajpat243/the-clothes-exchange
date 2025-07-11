import React from "react";
import "../styles/FilterSidebar.css";

function FilterSidebar({ categories, onChange }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ ...categories, [name]: checked });
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filter</h3>

      {/* Category Filter */}
      <div className="filter-group">
        <h4>Category</h4>
        {["Tops", "Bottoms", "Shoes", "Accessories"].map((cat) => (
          <label key={cat} className="filter-option">
            <input
              type="checkbox"
              name={cat}
              checked={categories[cat] || false}
              onChange={handleCheckboxChange}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      {/* <div className="filter-group">
        <h4>Price</h4>
        <label className="filter-option">
          <input
            type="checkbox"
            name="freeOnly"
            checked={filters.freeOnly || false}
            onChange={handleCheckboxChange}
          />
          Free Only
        </label>
      </div> */}

    </aside>
  );
}

export default FilterSidebar;
