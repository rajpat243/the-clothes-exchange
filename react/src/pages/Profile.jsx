import "../styles/Profile.css";

function Profile() {
  const mockUser = {
    username: "luo_long",
    bio: "Just a college student trying to make room in my closet",
    listings: [
      { title: "Cropped Hoodie", price: 10 },
      { title: "Vintage Jeans", price: 15 },
      { title: "Chunky Sneakers", price: 0, sold: true }, // Free
    ],
    followers: 128,
    following: 62,
    profilePic: "https://via.placeholder.com/100?text=Profile",
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={mockUser.profilePic} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>@{mockUser.username}</h2>
          <p>{mockUser.bio}</p>
          <div className="profile-stats">
            <span><strong>{mockUser.followers}</strong> Followers</span>
            <span><strong>{mockUser.following}</strong> Following</span>
          </div>
        </div>
      </div>

      <h3 className="listings-title">Listings</h3>
      <div className="listings-grid">
      {mockUser.listings.map((item, index) => (
  <div className={`listing-card ${item.sold ? "sold" : ""}`} key={index}>
    <div className="image-wrapper">
      <img
        src={`https://via.placeholder.com/150x150?text=${encodeURIComponent(item.title)}`}
        alt={item.title}
      />
      {item.sold && <div className="sold-overlay">SOLD</div>}
    </div>
    <p className="listing-title">{item.title}</p>
    <p className="listing-price">
      {item.price === 0 ? "Free" : `$${item.price}`}
    </p>
  </div>
))}

      </div>
    </div>
  );
}

export default Profile;
