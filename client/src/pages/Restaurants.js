import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>

      <div className="grid">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
