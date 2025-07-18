import "../styles/Profile.css";
import { fetchGet } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { data } from "react-router-dom";
import userImage from "../assets/user.png"; 

function Profile() {
    const [userItems, setUserItems] = useState([]);
    const url = `http://localhost:3002/api/product/user/${localStorage.getItem('userId')}`;
    useEffect(() => {
        const storedUser = localStorage.getItem("userId");
        if (storedUser) {
            fetchGet(url)
                .then((data) => {
                        setUserItems(data)
                })
                .catch((err) => console.error("Fetch error:", err));
        }
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={userImage} alt="Profile" className="profile-pic" /> {/* Use the imported image */}
                <div className="profile-info">
                    <h2>@{localStorage.getItem('userName')}</h2>
                    <p>{'Bio: Just a college kid trying to clear up space in their wardrobe'}</p>
                    <div className="profile-stats">
                        <span><strong>{'Followers: '}</strong> 1000</span>
                        <span><strong>{'Following: '}</strong> 25</span>
                    </div>
                </div>
            </div>

            <h3 className="listings-title">Listings</h3>
            <div className="listings-grid">
                {userItems.map((item) => (
                    <div className={'listing-card'} key={item._id}>
                        <div className="image-wrapper">
                            <img
                                src={item.imgUrl}
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
