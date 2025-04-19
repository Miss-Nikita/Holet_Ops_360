import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createPropertyService } from "../api/propertyServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css'; // Ensure you have this import for toast styling

const CreateProperty = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const formatedData = {
      ...data,
      images: (data.images = data.images.split(",")),
      amenities: (data.amenities = data.amenities.split(",")),
    };

    try {
      const res = await createPropertyService(formatedData);
      if (Object.keys(res).length > 0) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error creating property");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.value.split(",");
    const previews = files.map((file) => file.trim());
    setImagePreviews(previews);
  };

  return (
    <div className="loginPage flex z-[2] top-0 left-0 w-full mt-5 bg-zinc-100 min-h-screen items-start justify-center pt-24">
      <div className="py-6 w-[90%] md:w-[60%] lg:w-[40%] bg-white rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105 duration-300">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-4">
          Create Property
        </h1>

        <div className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { label: "Title", type: "text", name: "title", required: true },
              { label: "Description", type: "textarea", name: "description", required: true },
              { label: "Location", type: "text", name: "location", required: true },
              { label: "Price (INR per night)", type: "number", name: "price", required: true },
              { label: "Amenities", type: "text", name: "amenities", required: true },
              { label: "Images (comma-separated URLs)", type: "url", name: "images", required: true },
            ].map(({ label, type, name, required }, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex items-center mb-1">
                  <label className="text-md font-semibold mr-2">{label}:</label>
                  {type === "textarea" ? (
                    <textarea
                      className={`flex-1 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#b17f44] transition duration-200 ${errors[name] ? 'border-red-500' : ''}`}
                      rows="1"
                      style={{ height: '40px', overflow: 'hidden', resize: 'none' }}
                      {...register(name, { required: required && `${label} is required` })}
                    />
                  ) : (
                    <input
                      className={`flex-1 h-10 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[#b17f44] transition duration-200 ${errors[name] ? 'border-red-500' : ''}`}
                      type={type}
                      {...register(name, { required: required && `${label} is required` })}
                    />
                  )}
                </div>
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">
                    <i className="ri-information-fill text-red-500"></i> {errors[name].message}
                  </p>
                )}
              </div>
            ))}

            {imagePreviews.length > 0 && (
              <div className="flex flex-col mt-2">
                <label className="text-md font-semibold mb-1">Image Previews:</label>
                <div className="flex space-x-2">
                  {imagePreviews.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded-md border border-gray-300 transition-transform transform hover:scale-110 duration-300" />
                  ))}
                </div>
              </div>
            )}

            <button
              className={`w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-2 hover:bg-[#a16a3a] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Property"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .Toastify__toast {
          background: #333;
          color: #fff;
          border-radius: 5px;
          padding: 10px;
          font-size: 14px;
        }
        .Toastify__toast--success {
          background: #4caf50;
        }
        .Toastify__toast--error {
          background: #f44336;
        }
      `}</style>
    </div>
  );
};

export default CreateProperty;
