import React, { useContext, useRef } from "react";
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
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: checkoutCart,
    onSuccess: () => {
      cartCtx.items = []; // Clear cart items
      formRef.current?.reset(); // Reset form fields
      handleCloseCheckout(); // Close modal ONLY on success
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    mutate({ items: cartCtx.items, customer: customerData });
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"} 
      onClose={userProgressCtx.progress === "checkout" && !isPending ? handleCloseCheckout : null} // Prevent closing while loading
    >
      <form onSubmit={handleSubmit} ref={formRef}>
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
