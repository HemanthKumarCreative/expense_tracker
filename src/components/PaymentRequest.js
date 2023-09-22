import React from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";

const PaymentRequest = ({ setIsPremiumUser }) => {
  const handlePaymentRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment");
      const { order } = await response.data;
      console.log({ "order-details": order });
      const options = {
        key: "rzp_test_PPWdPOnQ2XuMkp", // Your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Test Company",
        description: "Payment for Services",
        order_id: order.id,
        handler: async function (order) {
          console.log(order);
          const orderData = {
            id: order.razorpay_order_id,
            user_id: JSON.parse(localStorage.getItem("token")).id,
            payment_id: order.razorpay_payment_id,
            status: "complete", // Adjust the status as needed
          };
          try {
            const response = await axios.post(
              "http://localhost:5000/api/orders",
              orderData
            );
            console.log("Order created:", response.data.order);
            console.log("User updated:", response.data.updatedUser);
            if (response.data.status === "complete") {
              setIsPremiumUser(true);
              localStorage.setItem(JSON.stringify(response.data.updatedUser));
            }
          } catch (error) {
            console.error("Error:", error);
          }

          alert("Payment successful"); // Handle successful payment
        },
      };

      const rzp1 = new window.Razorpay(options);
      await rzp1.open();
      console.log(rzp1);

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
