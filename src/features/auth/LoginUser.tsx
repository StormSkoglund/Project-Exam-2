import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useStore from "../../store";
import { loginSchema } from "./validationAuth";
import { postUserLogin } from "./postUserLogin";
import { useId } from "react";

interface LoginUser {
  email: string;
  password: string;
}

function LoginUser() {
  //Stack Overflow. (2023). How to generate unique IDs for form labels in React. [online] Available at: https://stackoverflow.com/questions/29420835/how-to-generate-unique-ids-for-form-labels-in-react/71681435[Accessed 22 Nov. 2024].
  const emailId = useId();
  const passwordId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(loginSchema),
  });
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setAccessToken = useStore((state) => state.setAccessToken);
  const handleCloseLogin = useStore((state) => state.handleCloseLogin);

  const onSubmit = async (data: LoginUser) => {
    try {
      const response = await postUserLogin(data);
      setIsLoggedIn(true);
      setAccessToken(response.accessToken);

      reset();
      handleCloseLogin();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
        <button
          onClick={handleCloseLogin}
          aria-label="Toggle Close Login"
          className="absolute top-2 right-2 text-slate-800 font-bold"
        >
          X
        </button>
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor={emailId}
              className="block text-sm font-medium text-gray-700"
            >
              Email*
            </label>
            <input
              type="email"
              id={emailId}
              autoComplete="email"
              {...register("email")}
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
              htmlFor={passwordId}
              className="block text-sm font-medium text-gray-700"
            >
              Password*
            </label>
            <input
              type="password"
              id={passwordId}
              {...register("password")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <span className="text-sm">*All fields are required.</span>
          <button
            type="submit"
            aria-label="Toggle Submit Login Form"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-theme-green border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
