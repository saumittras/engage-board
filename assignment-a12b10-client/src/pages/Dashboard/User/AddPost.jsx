import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddPost = () => {
  // imageBB API
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=ca8a7c6700b11bb2aab298b96564441b`;

  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadTag = async () => {
      const res = await axiosPublic.get("/tags");
      console.log(res);
      setTags(res.data);
    };
    loadTag();
  }, []);

  const getCurrentTimeISO = () => {
    const now = new Date();
    return now.toISOString();
  };
  // console.log(currentTime);

  const onSubmit = async (data) => {
    // image upload for image bb
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // image bb server response

    if (res.data.success) {
      const addPost = {
        authorImage: user?.photoURL,
        authorName: user?.displayName,
        authorEmail: user?.email,
        title: data.title,
        postImage: res.data.data.display_url,
        description: data.description,
        tag: data.tag,
        upVote: 0,
        downVote: 0,
        comments: 0,
        postTime: getCurrentTimeISO(),
      };

      const postRes = await axiosPublic.post("/addpost", addPost);
      console.log(postRes);
      if (postRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added your Post  successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Engage Board | User Add Post</title>
      </Helmet>
      <div className="heading">Add Your Post:</div>

      <div className="form-section">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Title: </span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              name="title"
              placeholder="Post title..."
              className="input input-bordered"
            />
            {errors.title && (
              <span className="text-red-600">Post Title is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Description</span>
            </label>
            <textarea
              type="text"
              {...register("description", { required: true })}
              placeholder="Post Description"
              className="input h-40 input-bordered"
            />
            {errors.description && (
              <span className="text-red-600">Post Description is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Tag: </span>
            </label>
            <select
              defaultValue="default"
              {...register("tag", { required: true })}
              className="select select-bordered"
            >
              <option disabled value="default">
                Select a Tag
              </option>
              {tags?.map((option, idx) => (
                <option key={idx} value={option?.tag}>
                  {option?.tagName}
                </option>
              ))}
            </select>

            {errors.title && (
              <span className="text-red-600">Post Title is required</span>
            )}
          </div>

          <label className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>

          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Post Now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
