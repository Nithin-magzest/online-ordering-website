export default function FoodCard({ food, addToCart }) {
  return (
    <div className="food-card">
      <img src={food.img} width="150" />

      <h3>{food.name}</h3>

      <p>₹{food.price}</p>

      <button onClick={() => addToCart(food)}>Add To Cart</button>
    </div>
  );
}
