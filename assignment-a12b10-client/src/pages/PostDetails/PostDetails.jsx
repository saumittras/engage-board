import React, { useContext } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData, useLocation } from "react-router-dom";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const postData = useLoaderData();
  console.log(postData, "from load data");

  return (
    <div className="w-full mx-auto border my-4 rounded-xl">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="upper grid grid-cols-12 p-4 border gap-4 rounded-full m-4">
          <div className="avatar col-span-1 ">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                alt={postData?.authorName && postData?.authorName}
                src={
                  postData?.authorName
                    ? postData?.authorImage
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>

          <div className="input col-span-11 ">
            <h2 className="text-lg font-bold">
              {postData?.authorName && postData?.authorName}
            </h2>
            <p>{postData?.postTime && postData?.postTime}</p>
          </div>
        </div>

        <div className="p-4 py-0">
          <div className="picture">
            <h2 className="text-xl font-bold pb-3">{postData?.title}</h2>
            <div className="">
              <figure className="">
                <img
                  className="rounded-xl w-full h-full "
                  src={postData?.postImage}
                  alt=""
                />
              </figure>
            </div>
            <div className="details py-3 lg:py-4">
              <p>{postData?.description}</p>
            </div>
          </div>

          <div className="card-actions justify-end">
            <div className=" react-button flex gap-5">
              <div className="join join-vertical lg:join-horizontal">
                <button className="btn  rounded-l-full">
                  <span>
                    <FaAngleDoubleUp />
                  </span>
                  {postData?.upVote}
                </button>
                <button className="btn rounded-r-full">
                  <span>
                    <FaAngleDoubleDown />
                  </span>
                  {postData?.upVote}
                </button>
              </div>

              <div className="commnt">
                <button className="btn rounded-full">
                  <span className="flex justify-center gap-3 items-center">
                    <FaRegCommentDots /> <span>300</span>
                  </span>
                </button>
                <button className="btn rounded-full">
                  <span className="flex justify-center gap-3 items-center">
                    <FaShare /> <span>200</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* comment section start from here */}
        <div className="comment grid grid-cols-12 p-4 border gap-3 rounded-full m-4">
          <div className="avatar col-span-1 ">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
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

          <div className="col-span-8 ">
            <input
              type="text"
              placeholder="Add a Comment..."
              className="input input-bordered rounded-full  w-full "
            />
          </div>
          <button className="btn col-span-3 bg-blue-500 text-white rounded-full">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
