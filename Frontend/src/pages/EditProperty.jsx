import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { updatePropertyService, viewPropertyService } from "../api/propertyServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const EditProperty = () => {
  const { id } = useParams();
  const [property, setproperty] = useState(null);
  // console.log(id);

  const fetchProperty = async (propertyId) => {
    const res = await viewPropertyService(propertyId);
    setproperty(res);

    const fields = ["title", "description", "location", "price"];

    fields.forEach((field) => setValue(field, res[field]));

    setValue("amenities", res.amenities.join(", "));
    setValue("images", res.images.join(", "));
    setValue("_id", propertyId);
  };
  useEffect(() => {
    fetchProperty(id);
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formatedData = {
      ...data,
      images: data.images.split(", "),
      amenities: data.amenities.split(", "),
    };
    // console.log(data);
    // dispatch(data);

    const res = await updatePropertyService(formatedData)
    if(Object.keys(res).length > 0){
      toast.success("Property saved Successfully");
      navigate("/profile")
    }
  };

  return (
    <div className="loginPage flex z-[2] top-0 left-0 w-full bg-zinc-100 h-screen items-center justify-center ">
      <div className=" py-1 w-[35%] bg-zinc-50 rounded-xl shadow-xl ">
        <div className="w-full py-4 relative">
          <div className="absolute left-[3%] top-1/2 -translate-y-1/2"></div>
          <h1 className="text-center font-bold text-lg text-zinc-800">
            Edit Property
          </h1>
        </div>

        <div className="py-5 px-5 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full border border-zinc-500 rounded-lg">
              <div className="w-full p-4 text-md relative  flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>Title:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl "
                  type="text"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Description:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl "
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Location:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl "
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.location.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Price (INR per night):</label>
                <input
                  className="w-[65%] h-full focus:outline-none text-xl "
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3  border-b border-zinc-500">
                <label>Amenities:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl "
                  type="text"
                  {...register("amenities", {
                    required: "Amenities are required",
                  })}
                />
                {errors.amenities && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.amenities.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 ">
                <label>Images:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl "
                  type="url"
                  {...register("images", {
                    required: "Images are required",
                    pattern: {
                      value: /(^\s*(https?:\/\/.*)\s*$)/i,
                      message: "Invalid image URL",
                    },
                  })}
                />
                {errors.images && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs ">
                    {" "}
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.images.message}
                  </p>
                )}
              </div>
            </div>
            <button
              className="w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-3"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
