import { useEffect, useState } from "react";

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <div>
      <h1>Featured Menu</h1>

      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
