import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const MakeAnnouncements = () => {
  const { user } = useContext(AuthContext);
  const getCurrentTimeISO = () => {
    const now = new Date();
    return now.toISOString();
  };
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const authorImage = user?.photoURL;
    const authorName = user?.displayName;
    const authorEmail = user?.email;
    const time = getCurrentTimeISO();
    const title = data.title;
    const description = data.description;

    const newAnnounce = {
      authorName,
      authorImage,
      authorEmail,
      title,
      description,
      time,
    };
    console.log(newAnnounce);
    const annRes = await axiosPublic.post("/announcement", newAnnounce);
    console.log(annRes);

    if (annRes.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Announcement Added Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className=" mx-auto border rounded-xl">
        <div className="upper flex justify-between py-6">
          <div className="avatar ml-4">
            <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
              <img
                alt={user?.displayName && user?.displayName}
                src={
                  user?.displayName
                    ? user?.photoURL
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold p-4">
            Add a Announcement to all Users{" "}
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="upper grid grid-cols-12 p-4 border gap-4 rounded-xl m-4">
              <div className=" col-span-12 ">
                <label className=" flex flex-col items-start gap-3">
                  <span>Title</span>

                  <input
                    type="text"
                    {...register("title", { required: true })}
                    name="title"
                    placeholder="What is your Announcement?"
                    className="input input-bordered rounded-full input-success w-full"
                  />
                  {errors.title && (
                    <span className="text-red-600">Post Title is required</span>
                  )}
                </label>
                <label className=" flex flex-col items-start py-4 gap-2">
                  <span>Description</span>
                  <textarea
                    {...register("description", { required: true })}
                    type="text"
                    required
                    name="description"
                    placeholder="Description?"
                    className="input input-bordered rounded-full input-success w-full "
                  />
                  {errors.description && (
                    <span className="text-red-600">
                      Description is required
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div className="">
              <div className="card-actions justify-end mb-4 mr-4">
                <div className="flex justify-center items-center">
                  <button className="badge btn-wide btn py-4 px-6 badge-outline rounded-full bg-blue-500 text-white cursor-pointer">
                    Add Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncements;
