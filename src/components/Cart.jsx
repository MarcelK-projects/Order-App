import {useEffect} from 'react';

export default function Cart({ cart, ref, checkout, order, showCart, showCheckout, addOrder, deleteOrder }) {
  
  useEffect(() => {
    if(cart && order.length !== 0) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [cart])

  const unique = [...new Set(order)];
  let totalPrice = 0;
  for (let item of order) {
    totalPrice += Number(item.price)
  }

  return (
    <dialog ref={ref}>
      <div>
      <h2>Your Cart</h2>
      {unique.map((item) => 
        <p>{item.name} - {order.filter((order) => { return order.id === item.id}).length} x ${item.price}
           <button onClick={() => deleteOrder(item)}>-</button>
           <button onClick={() => addOrder(item)}>+</button>
        </p>
      )}
      <p>${Math.round(totalPrice * 100) / 100}</p>
      <button onClick={showCart}>close</button>
      <button onClick={showCheckout}>Submit</button>
      </div>
    </dialog>
  )     
}