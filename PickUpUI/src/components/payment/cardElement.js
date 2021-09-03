import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ORDERS } from "../../navigation/CONSTANTS";
import { useHistory, useLocation } from "react-router-dom";
import useResponsiveFontSize from "./useResponsiveFontSize";
const stripe = loadStripe("pk_test_51JSifWJSoqVYwO4CuQy0pHIspSXCcL7gbLjBw9UPL9kUAMUzqt21gTdZAZOLtj5s5etLP4iImTV89X0AKvKeUYgI003NwwzsAt");
const useOptions = () => {
  // const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          // fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    })
    // [fontSize]
  );

  return options;
};
const history = useHistory();
const [message, setMessage] = useState("");
const validatePayment = () => {
  setErrors('successful payment');
  history.push({
    pathname: ORDERS,ß
    });
}
const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("[PaymentMethod]", payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe} onClick= {()=> validatePayment()}>
        Pay
      </button>
      <span style={message ? {visibility: "visible", color: "bleu"}: null} >{message}</span>
    </form>
  );
};

export default CardForm;
