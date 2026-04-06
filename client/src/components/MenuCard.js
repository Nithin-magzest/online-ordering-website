function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="menu-price">₹{item.price}</p>
      <button className="add-btn">Add to Cart</button>
    </div>
  );
}

export default MenuCard;
