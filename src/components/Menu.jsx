import { useState, useEffect } from 'react';
import Item from "./Item.jsx";
//import { data } from '../../backend/data/available-meals.json'

export default function Menu({ items, loading, order, onClick }) {
  //const [items, setItems] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [order, setOrder] = useState([]);
  //const [error, setError] = useState();
  
  /*useEffect(() => {
    
    fetch('../../backend/data/available-meals.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setItems(jsonData)
        setLoading(false)
        
      })
      .catch((e) => {
        console.log('Fehler beim Laden der Daten:', e)
      })
  }, []) */

  /*useEffect(() => {

    fetch('../../backend/data/orders.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setOrder(jsonData)
      })
      .catch((e) => {
        console.log('Fehler beim Laden der Daten:', e)
      })
  }, [order])*/

  if (loading) {
    return <p>is Loading...</p>
  }
  
  /*const selectMeal = (id) => {
    console.log("bin in selectMeal");
    setOrder((prev) => [id, ...prev]);
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order)
    });
  }*/

  return (
    <main id="meals">
      {items.map((item) => 
       <Item data={item} key={item.id} onClick={() => onClick(item)} />
      )}
    </main>
  )
}