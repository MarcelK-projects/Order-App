import { useEffect } from 'react';

export default function Success({ success, showSuccess, ref }) {

  useEffect(() => {
    if(success) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [success])

  return (
    <dialog ref={ref}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>We will get back to you with more details via email within the next few minutes</p>
      <button onClick={showSuccess}>Okay</button>
    </dialog>
  )
}