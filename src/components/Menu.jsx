import { useState, useEffect } from 'react';
import Item from "./Item.jsx";
//import { data } from '../../backend/data/available-meals.json'

export default function Menu({ items, loading, order, onClick }) {
  
  if (loading) {
    return <p>is Loading...</p>
  }
  
  return (
    <main id="meals">
      {items.map((item) => 
       <Item data={item} key={item.id} onClick={() => onClick(item)} />
      )}
    </main>
  )
}