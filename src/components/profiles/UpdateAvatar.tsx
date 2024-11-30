import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useId } from "react";
import {
  updateAvatarSchema,
  UpdateAvatarSchema,
} from "../ui/forms/profile/updateAvatarSchema";
import updateAvatarProfile from "../../features/auth/updateAvatarProfile";

function UpdateAvatar() {
  const avatarUrlId = useId();
  const avatarAltId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateAvatarSchema>({
    resolver: yupResolver(updateAvatarSchema),
  });

  const onSubmit = async (data: UpdateAvatarSchema) => {
    try {
      const response = await updateAvatarProfile(data.avatar);
      console.log(response);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
        <h2 className="text-3xl font-bold text-center">Update Avatar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor={avatarUrlId}
              className="block text-sm font-medium text-gray-700"
            >
              Avatar URL*
            </label>
            <input
              type="url"
              autoComplete="on"
              id={avatarUrlId}
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
              htmlFor={avatarAltId}
              className="block text-sm font-medium text-gray-700"
            >
              Avatar Alt Text (Short Description)*
            </label>
            <textarea
              autoComplete="off"
              id={avatarAltId}
              {...register("avatar.alt")}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.avatar?.alt && (
              <p className="mt-2 text-sm text-red-500">
                {errors.avatar.alt.message}
              </p>
            )}
          </div>
          <p>*Required Fields</p>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-theme-green rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Avatar
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAvatar;
