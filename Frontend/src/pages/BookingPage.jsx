import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { createBookingService } from "../api/bookingServices";
import { createRazorpayOrder } from "../api/paymentServices";
import { viewPropertyService } from "../api/propertyServices";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { search } = useLocation();
  const { id } = useParams();
  console.log(id);
  
  const data = decodeURIComponent(search)
    .split("?")[1]
    .split("&")
    .reduce((acc, item) => {
      const [key, value] = item.split("=");
      // Remove surrounding quotes from value if present
      acc[key] = value.replace(/^"|"$/g, "");
      return acc;
    }, {});

  const [paymentId, setpaymentId] = useState("");
  const [property, setproperty] = useState(null);
  const [status, setstatus] = useState("");
  const [totalAmount, settotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleConfirmOrder = async () => {
    const { status, id } = await createRazorpayOrder(totalAmount);
    console.log(status, id);
    console.log(status, id)
    setstatus(status)
    setpaymentId(id);
  }; 

  const createBooking = async () => {
    const bookingsData = {
      propertyId: id,
      status: "Confirmed",
      paymentId,
      checkInDate: new Date(data.checkinDate),
      checkOutDate: new Date(data.checkoutDate),
      totalAmount,
    };
    await createBookingService(bookingsData);
    navigate("/");
  };

  const getproperty = async (id) => {
    const property = await viewPropertyService(id);
    setproperty(property);
  };
  useEffect(() => {
    getproperty(id);
    settotalAmount(data.price * data.nights * data.guests);
  }, []);

  useEffect(() => {
    if (status === "authorized") {
      createBooking();
      toast.success("Order Confirmed");
    } else if (status != "") {
      toast.error("Payment failed. Please try again.");
      navigate("/");
    }
  }, [status]);
  console.log(data);

  return (
    <div className="h-screen w-full bg-zinc-50 px-40 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-6">Request to book</h1>

          {/* Trip Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-5">Your trip</h2>
            <div className="flex gap-20 items-center">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-black">Dates</p>
                  <p className="text-lg font-medium">
                    {new Date(data.checkinDate).getDate() +
                      " " +
                      new Date(data.checkinDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkinDate).getFullYear()}{" "}
                    –{" "}
                    {new Date(data.checkoutDate).getDate() +
                      " " +
                      new Date(data.checkoutDate).toLocaleString("default", {
                        month: "short",
                      }) +
                      " " +
                      new Date(data.checkoutDate).getFullYear()}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="text-xl font-semibold text-black">Guests</p>
                  <p className="text-lg font-medium">{data.guests}</p>
                </div>
              </div>
            </div>

            <button onClick={handleConfirmOrder} className="bg-[#b17f44] text-white font-bold py-2 px-10 rounded-lg mt-8">
              Book Now
            </button>
          </section>
        </div>

        {/* Right Section */}
        <div>
          <div className="border rounded-lg p-4">
            {/* Hotel Info */}
            <div className="flex gap-4 mb-6">
              <img
                src="https://via.placeholder.com/80" // Replace with actual image
                alt="Hotel"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">
                  Royal Boutique Hotel - VILA DOMINA
                </p>
                <p className="text-sm text-gray-600">Room in boutique hotel</p>
              </div>
            </div>

            {/* Price Details */}
            <h2 className="text-lg font-semibold mb-4">Price details</h2>
            <div className="flex justify-between text-sm mb-2">
              <p>
                ₹{data.price} x {data.nights} nights X {data.guests} guests
              </p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
            <div className="flex justify-between font-semibold text-md mt-4 border-t pt-4">
              <p>Total (INR)</p>
              <p>₹{data.price * data.nights * data.guests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
