import { useEffect, useState } from "react";
import Cards from "./partials/Cards";
import Footer from "./partials/Footer";
import Nav from "./partials/Nav";
import { useDispatch } from "react-redux";
import { searchPropertiesAction } from "../store/actions/propertyAction";
import Filter from "./partials/Filter";

const Home = () => {
  const [query, setquery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchPropertiesAction(query));
  }, [dispatch, query]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero Section with Hexagonal Pattern */}
      <div className="relative min-h-[90vh] overflow-hidden">
        {/* Hexagonal Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/hex-pattern.svg')] bg-repeat opacity-5"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#b17f44] via-[#d4a76a] to-[#b17f44]">
                Experience Luxury
                <span className="block text-[#b17f44]">Redefined</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium accommodations that blend comfort with elegance
            </p>
            
            {/* Search Bar with Hexagonal Design */}
            <div className="max-w-xl mx-auto mt-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#b17f44]/10 to-[#d4a76a]/10 rounded-2xl transform -rotate-6"></div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  placeholder="Search for your perfect stay..."
                  className="relative w-full px-6 py-4 rounded-2xl border border-[#b17f44]/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#b17f44] focus:border-transparent shadow-lg transition-all duration-300"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b17f44] hover:text-[#d4a76a] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#b17f44] to-[#d4a76a] mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Explore our curated selection of premium accommodations
          </p>
        </div>

        <Filter />
        <Cards />
      </div>

      {/* Stats Section with Hexagonal Cards */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b17f44]/5 to-[#d4a76a]/5 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-4xl font-bold text-[#b17f44] mb-2">500+</h3>
                <p className="text-gray-600">Properties</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b17f44]/5 to-[#d4a76a]/5 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-4xl font-bold text-[#b17f44] mb-2">10K+</h3>
                <p className="text-gray-600">Happy Guests</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#b17f44]/5 to-[#d4a76a]/5 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative p-8 rounded-2xl bg-white shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-4xl font-bold text-[#b17f44] mb-2">50+</h3>
                <p className="text-gray-600">Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
