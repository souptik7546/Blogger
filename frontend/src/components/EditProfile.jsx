import { useState } from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

function EditProfile(userData) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState(
    userData?.userData?.avatar || ""
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      newusername: userData?.userData?.username || "",
      newfullname: userData?.userData?.fullname || "",
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const updateHandler = (data) => {
    authService
      .updateUserProfile(data)
      .then((data) => {
        dispatch(login(data?.data?.data))
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Profile
          </h2>
        </div>

        {/* Form */}
        <form className="p-6 space-y-8" onSubmit={handleSubmit(updateHandler)}>
          {/* Avatar */}
          <div className="flex items-center gap-10">
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-1">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                    Avatar
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Profile picture
              </label>
              <Input
              label="Avatar :"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                {...register("avatar", {
                  required: false,
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setAvatarPreview(URL.createObjectURL(file));
                  },
                })}
                className="text-sm text-gray-600 dark:text-gray-300
                           file:mr-4 file:py-1.5 file:px-3
                           file:rounded-md file:border-0
                           file:bg-gray-100 dark:file:bg-gray-700
                           file:text-gray-700 dark:file:text-gray-200
                           hover:file:bg-gray-200 dark:hover:file:bg-gray-600"
              />
            </div>
          </div>

          {/* Full name */}
          <Input
            label="Full name :"
            {...register("newfullname", { required: false })}
          />

          {/* Username */}
          <Input
            label="Username :"
            {...register("newusername", { required: false })}
          />

          <Input
            label="Password :"
            type="password"
            {...register("password", { required: true })}
          />

          {/* Action */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              className="px-5 py-2 text-sm rounded-md bg-gray-900 dark:bg-white
                         text-white dark:text-gray-900 hover:opacity-90"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
