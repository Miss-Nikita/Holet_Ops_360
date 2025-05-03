import { useEffect, useState } from "react";
import Cards from "./partials/Cards";
import Footer from "./partials/Footer";
import Nav from "./partials/Nav";
import { useDispatch } from "react-redux";
import { searchPropertiesAction } from "../store/actions/propertyAction";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  ];

  useEffect(() => {
    dispatch(searchPropertiesAction(""));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLearnMore = () => {
    setIsLearnMoreOpen(true);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsLearnMoreOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f0] to-white">
      {/* Hero Section with Dynamic Background */}
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c1810]/40 to-transparent z-10"></div>
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: "scale(1.1)",
            }}
          />
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-full flex items-center z-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold tracking-tight text-white drop-shadow-lg"
              >
                Experience the{" "}
                <span className="bg-gradient-to-r from-[#d4a76a] to-[#b17f44] bg-clip-text text-transparent">
                  Aura
                </span>{" "}
                <br className="hidden md:block" />
                of Elegance.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg"
              >
                Discover luxury accommodations that redefine comfort and style
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center gap-4 mt-8"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('properties').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#b17f44] text-white rounded-full hover:bg-[#a16a3a] transition-all duration-300 shadow-lg"
                >
                  Explore Properties
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLearnMore}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Image Navigation Dots */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"
        >
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-[#b17f44] scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Properties Section */}
      <motion.div 
        id="properties"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4 relative inline-block group"
          >
            Featured Properties
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#b17f44] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated selection of premium accommodations
          </motion.p>
        </div>

        <Cards onPropertyClick={handlePropertyClick} />
      </motion.div>

      {/* Stats Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#f8f5f0] py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "500+", label: "Properties" },
              { number: "10K+", label: "Happy Guests" },
              { number: "50+", label: "Destinations" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl font-bold text-[#b17f44] mb-4">{stat.number}</div>
                <p className="text-xl text-gray-600">{stat.label}</p>
                <div className="mt-4 h-1 w-20 bg-[#b17f44]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            What Our Guests Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                date: "March 15, 2024",
                rating: 5,
                review: "The luxury suite exceeded all our expectations. The attention to detail in the room design and the exceptional service made our stay truly memorable. The view from our balcony was breathtaking!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              },
              {
                name: "Michael Chen",
                location: "Singapore",
                date: "February 28, 2024",
                rating: 5,
                review: "From the moment we arrived, the staff made us feel like royalty. The spa services were exceptional, and the dining experience was world-class. We'll definitely be returning!",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              },
              {
                name: "Emma Williams",
                location: "London, UK",
                date: "March 5, 2024",
                rating: 5,
                review: "The property's location was perfect for exploring the city, and the room was incredibly comfortable. The concierge service helped us plan our perfect itinerary. A truly five-star experience!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-[#f8f5f0] hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full overflow-hidden"
                  >
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p 
                  whileHover={{ scale: 1.02 }}
                  className="text-gray-600 italic"
                >
                  "{review.review}"
                </motion.p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Stayed {review.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#b17f44] text-white p-3 rounded-full shadow-lg hover:bg-[#a16a3a] transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      {/* Learn More Modal */}
      {isLearnMoreOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl transform transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedProperty ? selectedProperty.title : "About Our Properties"}
              </h3>
              <button
                onClick={() => {
                  setIsLearnMoreOpen(false);
                  setSelectedProperty(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {selectedProperty ? (
                <>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <p className="text-gray-600">{selectedProperty.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-[#f8f5f0] rounded-xl">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold text-[#b17f44]">${selectedProperty.price}/night</p>
                    </div>
                    <div className="p-4 bg-[#f8f5f0] rounded-xl">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-xl font-bold text-[#b17f44]">{selectedProperty.location}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600">
                    Welcome to our luxury property collection. We offer premium accommodations that combine comfort, style, and exceptional service.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-[#f8f5f0] rounded-xl">
                      <p className="text-sm text-gray-500">Properties</p>
                      <p className="text-xl font-bold text-[#b17f44]">500+</p>
                    </div>
                    <div className="p-4 bg-[#f8f5f0] rounded-xl">
                      <p className="text-sm text-gray-500">Destinations</p>
                      <p className="text-xl font-bold text-[#b17f44]">50+</p>
                    </div>
                  </div>
                </>
              )}
              <button
                onClick={() => {
                  setIsLearnMoreOpen(false);
                  setSelectedProperty(null);
                }}
                className="w-full mt-6 px-6 py-3 bg-[#b17f44] text-white rounded-full hover:bg-[#a16a3a] transition-all duration-300"
              >
                {selectedProperty ? "Book Now" : "Explore Properties"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
