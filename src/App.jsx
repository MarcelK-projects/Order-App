import { useEffect, useState, useRef } from 'react';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [success, setSuccess] = useState(false);
  const checkoutModal = useRef();
  const cartModal = useRef();
  const successModal = useRef();

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
      fetch("../../backend/data/orders.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
      });
    }

    const deleteOrder = (target) => {
      console.log("bin in deleteOrder");
      setOrder((prev) => deleteOne(prev, target.id))
      if (order.length === 1) {
        setCartOpen(!cartOpen);
      }
    }

    const deleteOne = (arr, targetId) => {
      const index = arr.findIndex(item => item.id === targetId);
      if (index === -1) return arr; // nichts gefunden
      return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }

    const showCart = () => {
      if(order.length !==0 || cartOpen === true) {
      setCartOpen(!cartOpen);
      setCheckoutOpen(false);
      }
    }

    const showCheckout = () => {
      setCheckoutOpen(!checkoutOpen);
      setCartOpen(checkoutOpen ? true : false);
    }

    const showSuccess = () => {
      setSuccess(!success);
      setCartOpen(false);
      setCheckoutOpen(false);
      if (success) {
        setOrder([]);
      }
    }

  return (
    <div>
      <header id="main-header">
        <div id="title">
        <img src="./logo.jpg"/>
        <h1>REACTFOOD</h1>
        </div>
        <button onClick={showCart}>Cart({order.length})</button>
      </header>
      <Menu 
        items={items} 
        loading={loading} 
        order={order} 
        onClick={selectMeal} 
      />
      <Cart 
        cart={cartOpen} 
        checkout={checkoutOpen} 
        ref={cartModal}
        order={order} showCart={showCart} 
        showCheckout={showCheckout} 
        addOrder={selectMeal} 
        deleteOrder={deleteOrder} 
      />
      <Checkout 
        open={checkoutOpen} 
        ref={checkoutModal} 
        showCheckout={showCheckout} 
        showSuccess={showSuccess} 
        success={success} 
      />
      <Success 
        ref={successModal}
        showSuccess={showSuccess}
        success={success}
      />
    </div>
  );
}

export default App;
