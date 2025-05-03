import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchPropertiesAction } from "../../store/actions/propertyAction";

const Filter = ({ display, setDisplay }) => {
  const {register, handleSubmit} = useForm();
  const properties = useSelector((store) => store.property.properties);
  const dispatch = useDispatch();

  const locations = properties.map((p) => p.location);

  const onSubmit = (data) => {
    const query = `?location=${data.location}&minPrice=${data.minPrice}&maxPrice=${data.maxPrice}`;
    dispatch(searchPropertiesAction(query));
    setDisplay(false);
  }

  if (!display) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with increased opacity and blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setDisplay(false)}
      ></div>
      
      {/* Filter Modal */}
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Filters</h1>
          <button
            onClick={() => setDisplay(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Location Select */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-900">
                Location
              </label>
              <select
                {...register("location")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b17f44] focus:border-[#b17f44] transition-all"
              >
                <option value="" disabled>Select Location</option>
                {locations.map((location, i) => (
                  <option key={i} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-900">
                Price Range <span className="text-sm text-gray-500">(INR)</span>
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b17f44] focus:border-[#b17f44] transition-all"
                  max="99999"
                  min="0"
                  {...register("minPrice")}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b17f44] focus:border-[#b17f44] transition-all"
                  max="99999"
                  min="0"
                  {...register("maxPrice")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#b17f44] text-white rounded-lg font-semibold hover:bg-[#a16a3a] transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Filters
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
