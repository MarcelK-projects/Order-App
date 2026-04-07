import { useEffect, useState, useRef } from 'react';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const checkoutModal = useRef();
  const cartModal = useRef();
  

  useEffect(() => {
      
      fetch('../../backend/data/available-meals.json')
        .then((response) => response.json())
        .then((jsonData) => {
          setItems(jsonData)
          setLoading(false)
          
        })
        .catch((e) => {
          console.log('Fehler beim Laden der Daten:', e)
        })
    }, [])
  
    const selectMeal = (item) => {
      console.log("bin in selectMeal");
      setOrder((prev) => [item, ...prev]);
      fetch("http://localhost:3000/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
      });
    }

    const deleteOrder = (target) => {
      console.log("bin in deleteOrder");
      setOrder((prev) => deleteOne(prev, target.id))
    }

    const deleteOne = (arr, targetId) => {
      const index = arr.findIndex(item => item.id === targetId);
      if (index === -1) return arr; // nichts gefunden
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }

    const showCart = () => {
      setCartOpen(!cartOpen);
      setCheckoutOpen(false);
    }

    const showCheckout = () => {
      setCheckoutOpen(!checkoutOpen);
      setCartOpen(checkoutOpen ? true : false);
    }

  return (
    <>
      <img src=""/>
      <h1 id="main-header">REACTFOOD
        <button onClick={showCart}>Cart({order.length})</button>
      </h1>
      <Menu items={items} loading={loading} order={order} onClick={selectMeal} />
      <Cart 
        cart={cartOpen} 
        checkout={checkoutOpen} 
        ref={cartModal}
        order={order} showCart={showCart} 
        showCheckout={showCheckout} 
        addOrder={selectMeal} 
        deleteOrder={deleteOrder} 
      />
      <Checkout open={checkoutOpen} ref={checkoutModal} showCheckout={showCheckout} />
    </>
  );
}

export default App;
