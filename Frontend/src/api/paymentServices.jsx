import axios from "./axiosConfig";
import { toast } from "react-toastify";



export const processPayment = async (paymentData) => {
    try {
      const { data } = await axios.post("/payments", paymentData);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const paymentFetch = async (paymentId) => {
    try {
      const { data } = await axios.get(`payments/fetch-payment/${paymentId}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  export const createRazorpayOrder = async (amount) => {
    try {
      const response = await axios.post("/payments", {
        amount,
        currency: "INR",
      });
  
      if (response.status === 200) {
        console.log("Order created successfully!");
      } else {
        console.log("Failed to create order!");
      }
  
      return handleRazorpayScreen(response.data.order.amount);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const handleRazorpayScreen = async (order) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      if (!res) {
        toast.error("Razorpay SDK failed to load!");
        return;
      }
      // if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      //   toast.error("Razorpay key is missing!");
      //   return;
      // }
      return new Promise((resolve, reject) => {
        console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: "Aura Stay",
          description: "Payment Gateway",
          order_id: order.id, // 🧠 important
          handler: function (response) {
            paymentFetch(response.razorpay_payment_id)
              .then((status) => resolve(status.payment))
              .catch((error) => reject(error));
          },
          theme: {
            color: "#b17f44",
          },
        };
  
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    } catch (error) {
      toast.error("Error in payment!");
    }
  };
  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };