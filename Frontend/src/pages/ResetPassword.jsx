import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axiosConfig";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/users/reset-password/${token}`, {
        password: data.password,
      });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="loginPage flex z-[2] top-0 left-0 w-full bg-zinc-100 min-h-screen items-center justify-center">
      <div className="py-6 w-[90%] md:w-[60%] lg:w-[40%] bg-white rounded-lg shadow-lg border border-gray-300">
        <h1 className="text-center font-bold text-3xl text-gray-800 mb-4">
          Reset Password
        </h1>

        <div className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="w-full border border-zinc-500 rounded-lg">
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3 border-b border-zinc-500">
                <label>New Password:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs">
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="p-4 text-md relative w-full flex justify-center items-center gap-3">
                <label>Confirm Password:</label>
                <input
                  className="w-full h-full focus:outline-none text-xl"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <p className="absolute bottom-0 left-[3%] w-full text-[red] text-xs">
                    <i className="ri-information-fill text-[red]"></i>{" "}
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              className="w-full text-center bg-[#b17f44] mt-4 text-white rounded-md py-3 hover:bg-[#a16a3a] transition duration-300"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 