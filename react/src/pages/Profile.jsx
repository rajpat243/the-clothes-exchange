import "../styles/Profile.css";
import { fetchGet } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { data } from "react-router-dom";
function Profile() {

    const [userItems, setUserItems] = useState([]);
    const url = `http://localhost:3002/api/product/user/${localStorage.getItem('userId')}`;
    useEffect(() => {
        const storedUser = localStorage.getItem("userId");
        if (storedUser) {
            fetchGet(url)
                .then((data) => {
                        setUserItems(data)
                        console.log("Fetched Products: ", data)
                })
                .catch((err) => console.error("Fetch error:", err));
    }}, []);
    /*
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

  */



  return (
    <div className="profile-page">
      <div className="profile-header">
        <img alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>@{localStorage.getItem('userName')}</h2>
          <p>{'Bio: '}</p>
          <div className="profile-stats">
            <span><strong>{'Follower: 1156'}</strong> Followers</span>
            <span><strong>{'Following: 5'}</strong> Following</span>
          </div>
        </div>
      </div>

      <h3 className="listings-title">Listings</h3>
      <div className="listings-grid">
      {userItems.map((item) => (
        <div className={'listing-card'} key={item._id}>
            <div className="image-wrapper">
            <img
                src={`https://via.placeholder.com/150x150?text=${encodeURIComponent(item.title)}`}
                alt={item.title}
            />
            {/* {item.sold && <div className="sold-overlay">SOLD</div>} */}
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