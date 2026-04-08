import {useEffect, forwardRef } from 'react';

const Checkout = forwardRef(function Checkout({ open, showCheckout, showSuccess, success }, ref) {
  

  useEffect(() => {
    if(open) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [open]) 


  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <dialog ref={ref}>
      <form onClick={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: </p>
        <p>Full Name</p>
        <input type="text" required/>
        <p>E-Mail Adress</p>
        <input type="email" name="mail" id="mail" required />
        <p>Street</p>
        <input type="text" required />
        <p>Postal Code</p>
        <input type="text" required />
        <p>City</p>
        <input type="text" required />
        <button onClick={showCheckout}>Close</button>
        <button onClick={showSuccess}>Submit Order</button>
      </form>
    </dialog>
  );
});

export default Checkout;
