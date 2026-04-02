import { useEffect, useState } from "react";

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Food Menu</h1>

      {menu.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
