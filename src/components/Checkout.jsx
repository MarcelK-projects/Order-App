import {useEffect, forwardRef} from 'react';

const Checkout = forwardRef(function Checkout({ open, showCheckout }, ref) {

  useEffect(() => {
    if(open) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [open]) 


  return (
    <dialog ref={ref}>
      <form>
        <h2>Checkout</h2>
        <p>Total amount: </p>
        <p>Full Name</p>
        <input type="text" />
        <p>E-Mail Adress</p>
        <input type="text" />
        <p>Street</p>
        <input type="text" />
        <p>Postal Code</p>
        <input type="text" />
        <p>City</p>
        <input type="text" />
        <button onClick={showCheckout}>Cancel</button>
        <button>Submit</button>
      </form>
    </dialog>
  );
});

export default Checkout;