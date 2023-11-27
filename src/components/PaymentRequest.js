import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentRequest = ({
  setUserInfo,
  setIsLeaderBoardShown,
  isLeaderBoardShown,
}) => {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const [isPremiumUser, setIsPremiumUser] = useState(userInfo.isPremiumUser);

  const handlePaymentRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/order/collect-payment`
      );
      const order = await response.data.body;
      console.log({ order });
      const options = {
        key: "rzp_test_KWXeQRtZiHyU85",
        amount: order.amount,
        currency: order.currency,
        name: "Test Company",
        description: "Payment for Services",
        order_id: order.order_id,
        handler: async function (order) {
          const orderData = {
            id: order.order_id,
            user_id: userInfo?.id,
            payment_id: order.order_id,
            status: "complete",
          };

          try {
            const response = await axios.put(
              `http://localhost:5000/api/v1/user/${userInfo?.id}`,
              { isPremiumUser: true }
            );
            console.log(response);
            const { body } = await response.data;

            setUserInfo(body);
            setIsPremiumUser(true);
            Cookies.set("userInfo", JSON.stringify(body));
          } catch (error) {
            console.error("Error:", error);
          }

          alert("Payment successful");
        },
      };

      const rzp1 = new window.Razorpay(options);
      await rzp1.open();
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
