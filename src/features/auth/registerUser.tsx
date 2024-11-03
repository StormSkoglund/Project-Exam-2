import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useStore from "../../store";
import { registerSchema } from "./validationAuth";
import { User } from "../../store";
import { postUserRegister } from "./postUserRegister";

function RegisterUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(registerSchema),
  });
  const setUser = useStore((state) => state.setUser);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);

  const onSubmit = async (data: User) => {
    try {
      const venueManagerCheckbox = document.getElementById(
        "venueManager"
      ) as HTMLInputElement;
      const updatedData = {
        ...data,
        venueManager: venueManagerCheckbox?.checked || false,
      };
      await postUserRegister(updatedData);
      setUser(updatedData);
      setIsLoggedIn(true);
      console.log(updatedData);
      reset();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Register*</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name*
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email*
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="example@stud.noroff.no"
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password*
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="avatar-url"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar URL
            </label>
            <input
              type="url"
              {...register("avatar.url")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.avatar?.url && (
              <p className="mt-2 text-sm text-red-500">
                {errors.avatar.url.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="avatar-alt"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar Alt Text
            </label>
            <input
              type="text"
              {...register("avatar.alt")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.avatar?.alt && (
              <p className="mt-2 text-sm text-red-500">
                {errors.avatar.alt.message}
              </p>
            )}
          </div>
          <span className="text-sm">*Required fields.</span>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="venueManager"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              {...register("venueManager")}
            />
            <label
              htmlFor="venueManager"
              className="ml-2 block text-sm text-gray-900"
            >
              Create Venue Manager Account
            </label>
          </div>
          <p className="m-2 font-thin text-sm">
            Venue managers will receive a customized admin profile with tools
            for setting up rental solutions for their properties.
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Customer Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
