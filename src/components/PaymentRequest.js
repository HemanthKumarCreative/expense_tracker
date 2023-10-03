import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import base_url from "../utils/url";
const PaymentRequest = ({
  setUserInfo,
  setIsLeaderBoardShown,
  isLeaderBoardShown,
}) => {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const [isPremiumUser, setIsPremiumUser] = useState(userInfo.isPremiumUser);

  const handlePaymentRequest = async () => {
    try {
      const response = await axios.post(`${base_url}/api/payment`);
      const { order } = await response.data;

      console.log({ userInfo });
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
            user_id: userInfo.id,
            payment_id: order.razorpay_payment_id,
            status: "complete", // Adjust the status as needed
          };

          try {
            const response = await axios.post(
              `${base_url}/api/orders`,
              orderData
            );
            const { order, updatedUser } = await response.data;
            console.log("Order created:", order);
            console.log("User updated:", updatedUser);

            setUserInfo(updatedUser);
            setIsPremiumUser(true);
            Cookies.set("userInfo", JSON.stringify(updatedUser));
            console.log({ isPremiumUser });
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

  const showLeaderBoard = () => {
    setIsLeaderBoardShown(!isLeaderBoardShown);
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "space-around", width: "25em" }}
    >
      {!isPremiumUser ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePaymentRequest}
          disabled={!isPremiumUser ? false : true}
        >
          {!isPremiumUser ? "Buy Premium" : "Pro User"}
        </Button>
      ) : (
        <></>
      )}
      {!isPremiumUser ? (
        <></>
      ) : (
        <Button variant="contained" color="secondary" onClick={showLeaderBoard}>
          {isLeaderBoardShown ? "Show Expenses" : "Show Leader Board"}
        </Button>
      )}
    </Container>
  );
};

export default PaymentRequest;
