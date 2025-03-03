import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { useMutation } from "@tanstack/react-query";
import { checkoutCart } from "../https";


const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
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
      handleCloseCheckout();
      cartCtx.items = [];
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
      onClose={
        userProgressCtx.progress === "checkout" ? handleCloseCheckout : null
      }
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>
          Total Amount:{currencyFormatter.format(cartTotal)}
        </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {!isPending &&
            <Button type="button" textOnly onClick={handleCloseCheckout}>
              Close
            </Button>}

          <Button>
            {isPending ? "Submitting...." : "Submit Order"}
          </Button>
        </p>
        {isError && <p>{error.info?.message || "Error is detected while placing order"}</p>}
      </form>
    </Modal>
  );
};

export default Checkout;
