import React from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";

const PaymentRequest = () => {
  const handlePaymentRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment");
      const { order } = await response.data;

      const options = {
        key: "rzp_test_PPWdPOnQ2XuMkp", // Your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Test Company",
        description: "Payment for Services",
        order_id: order.id,
        handler: function (response) {
          console.log(response);
          alert("Payment successful"); // Handle successful payment
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      // You can now redirect the user to the Razorpay payment page using the received data.
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={handlePaymentRequest}
      >
        Buy Premium
      </Button>
    </Container>
  );
};

export default PaymentRequest;
