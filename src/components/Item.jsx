export default function Item({ data, onClick }) {
  
  return (
    <>
      <ul className="meal-item">
        <img src={`http://localhost:3000/${data.image}`} />
        <p>{data.name}</p>
        <p>${data.price}</p>
        <p>{data.description}</p>
        <button onClick={() => onClick(data.id)}>Add to Cart</button>
      </ul>
    </>
  )
}