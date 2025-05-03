import React, { useEffect, useState } from "react";
import Footer from "./partials/Footer";
import BookingCard from "./partials/BookingCard";
import { useParams } from "react-router-dom";
import { viewPropertyService } from "../api/propertyServices";
import { addReview, viewReviews } from "../api/reviewServices";
import { calculateAvgRating, calculateDuration } from "../utils/Math";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SingleProperty = () => {
  const { id } = useParams();

  const [propertyData, setpropertyData] = useState(null);
  const [reviewsData, setreviewsData] = useState(null);
  const [avgRating, setavgRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  // console.log(newReview);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const getproperty = async (id) => {
    const property = await viewPropertyService(id);
    // console.log(property);
    setpropertyData(property);
  };

  const getreviews = async (id) => {
    const res = await viewReviews(id);
    // console.log(res);

    setreviewsData(res);
    res.length > 0 &&
      setavgRating(calculateAvgRating(res.map((r) => r.rating)));
  };

  useEffect(() => {
    getproperty(id);
    getreviews(id);
  }, [id]);

  const ratings = [
    { label: "Cleanliness", value: "5.0", icon: "ri-sparkling-line" },
    { label: "Accuracy", value: "5.0", icon: "ri-checkbox-circle-line" },
    { label: "Check-in", value: "5.0", icon: "ri-key-line" },
    { label: "Communication", value: "4.9", icon: "ri-chat-4-line" },
    { label: "Location", value: "5.0", icon: "ri-map-pin-line" },
    { label: "Value", value: "4.9", icon: "ri-price-tag-3-line" },
  ];

  const onSubmit = async (data) => {
    data.propertyId = id;

    const res = await addReview(data);
    if (res) {
      toast.success("Review added successfully");
      getreviews(id);
    }
    setreviewsData={
      ratings:0,
      comment:""
    }
  };


  return (
    propertyData && (
      <>
        <div className="min-h-screen w-full bg-zinc-50 pt-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row w-full gap-8">
            {/* Left Column - Property Images and Details */}
            <div className="w-full lg:w-2/3 space-y-8">
              {/* Property Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
                <div className="md:col-span-2 h-[50vh] md:h-[60vh] relative group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"></div>
                  <img
                    src={propertyData.images[0]}
                    alt="Main property view"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[30vh] relative group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"></div>
                  <img
                    src={propertyData.images[1]}
                    alt="Property view 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[30vh] relative group">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"></div>
                  <img
                    src={propertyData.images[2]}
                    alt="Property view 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {propertyData.location}
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center">
                        <i className="ri-star-fill text-2xl text-[#b17f44]"></i>
                        <span className="ml-1 font-semibold">{avgRating}</span>
                      </div>
                      <div className="h-6 w-px bg-gray-300"></div>
                      <div>
                        <span className="font-semibold">{propertyData.totalReview}</span>
                        <span className="text-gray-600 ml-1">reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-600">{propertyData.description}</p>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">What this place offers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {propertyData.amenities.slice(0, 10).map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <i className="ri-checkbox-circle-fill text-[#b17f44]"></i>
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {propertyData.amenities.length > 10 && (
                    <button className="mt-4 text-[#b17f44] hover:text-[#a16a3a] transition-colors">
                      Show all {propertyData.amenities.length} amenities
                    </button>
                  )}
                </div>

                {/* Reviews Section */}
                <div className="space-y-8">
                  {/* Overall Rating */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <img
                        className="h-24"
                        src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
                        alt="Guest favorite"
                      />
                      <h2 className="text-6xl font-bold text-gray-900">{avgRating}</h2>
                      <img
                        className="h-24"
                        src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
                        alt="Guest favorite"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Guest favorite</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      One of the most loved homes on Airbnb based on ratings, reviews and reliability
                    </p>
                  </div>

                  {/* Rating Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {ratings.map((rating) => (
                      <div key={rating.label} className="text-center space-y-2">
                        <p className="text-xl font-semibold">{rating.value}</p>
                        <i className={`${rating.icon} text-2xl text-[#b17f44]`}></i>
                        <p className="text-gray-600 text-sm">{rating.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviewsData?.slice(0, 6).map((review, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={review.user.profileImage || "https://via.placeholder.com/40"}
                              alt={review.user.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.user.username}</h4>
                            <p className="text-sm text-gray-500">
                              {calculateDuration(review.user.createdAt)} on Airbnb
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <i key={i} className="ri-star-fill text-[#b17f44]"></i>
                          ))}
                          <span className="text-sm text-gray-500">
                            {calculateDuration(review.createdAt)} ago
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Add your review</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, index) => (
                            <label
                              key={index}
                              className="cursor-pointer"
                              onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                            >
                              <input
                                {...register("rating", { required: true })}
                                type="radio"
                                name="rating"
                                value={index + 1}
                                className="sr-only"
                              />
                              <i
                                className={`ri-star-fill text-2xl ${
                                  index + 1 <= getValues("rating")
                                    ? "text-[#b17f44]"
                                    : "text-gray-300"
                                }`}
                              ></i>
                            </label>
                          ))}
                        </div>
                        {errors.rating && (
                          <p className="text-red-500 text-sm">Please select a rating</p>
                        )}
                      </div>
                      <div>
                        <textarea
                          {...register("comment", { required: true })}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17f44]"
                          placeholder="Share your experience..."
                          rows="3"
                        ></textarea>
                        {errors.comment && (
                          <p className="text-red-500 text-sm">Please write a review</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="bg-[#b17f44] text-white px-6 py-2 rounded-lg hover:bg-[#a16a3a] transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24">
                <BookingCard property={propertyData} />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  );
};

export default SingleProperty;
