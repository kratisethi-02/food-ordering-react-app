import React, { useContext, useRef, useState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useMutation } from "@tanstack/react-query";
import { checkoutCart } from "../https";
import Error from "./Error"; // Ensure Error component is imported

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const formRef = useRef(null); // Ref to store form reference

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
    setSuccessful(false);
  }

  const [successful,setSuccessful]=useState(false);
  const {mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: checkoutCart,
    onSuccess: () => {
      cartCtx.clearCart(); // Clear cart items
      formRef.current?.reset(); // Reset form fields
      setSuccessful(true); // Close modal ONLY on success
    }
  });

  function handleSubmitAction(fd) {
   
  
    const customerData = Object.fromEntries(fd.entries());

    mutate({ items: cartCtx.items, customer: customerData });
  }
  if(successful){
    return <Modal  open={userProgressCtx.progress === "checkout"} onClose={handleCloseCheckout}>
        <h2>Success!!</h2>
        <p>Your Order was successfully placed. </p>
        <p>We are preparing your food, more details will be shared via message</p>
         <Button type="button"  className="modal-actions" onClick={handleCloseCheckout}>
              Okay
            </Button>

    </Modal>
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"} 
      onClose={userProgressCtx.progress === "checkout" && !isPending ? handleCloseCheckout : null} // Prevent closing while loading
    >
      <form action={handleSubmitAction} ref={formRef}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {!isPending && (
            <Button type="button" textOnly onClick={handleCloseCheckout}>
              Close
            </Button>
          )}
          <Button>{isPending ? "Submitting..." : "Submit Order"}</Button>
        </p>
        {/* Show error message if error exists */}
        {isError && <p>{error.info?.message || "Something went wrong"} </p>}
              </form>
    </Modal>
  );
};

export default Checkout;
