import React, { useContext } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookShareCount } from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PostCard = ({ post, reFetchPost }) => {
  const { user } = useContext(AuthContext);
  const shareUrl = window.location.href;
  const axiosPublic = useAxiosPublic();

  const handleUpVote = async (post) => {
    const updateElement = {
      upVote: post?.upVote + 1,
    };
    const upVote = await axiosPublic.patch(
      `/upvote/${post._id}`,
      updateElement
    );
    if (upVote.data.modifiedCount > 0) {
      reFetchPost();
    }
  };
  const handleDownVote = async (post) => {
    const updateElement = {
      downVote: post?.downVote + 1,
    };
    const downVote = await axiosPublic.patch(
      `/downvote/${post._id}`,
      updateElement
    );
    if (downVote.data.modifiedCount > 0) {
      reFetchPost();
    }
  };

  return (
    <div className="w-full mx-auto border my-4 rounded-xl">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="upper grid grid-cols-12 p-4 border gap-4 rounded-full m-4">
          <div className="avatar col-span-1 ">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                alt={post?.authorName && post?.authorName}
                src={
                  post?.authorName
                    ? post?.authorImage
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>

          <div className="input col-span-11 ">
            <h2 className="text-lg font-bold">
              {post?.authorName && post?.authorName}
            </h2>
            <p>{post?.postTime && post?.postTime}</p>
          </div>
        </div>

        <div className="p-4 py-0">
          <div className="picture">
            <h2 className="text-xl font-bold pb-3">{post?.title}</h2>
            <div className="">
              <figure className="">
                <img
                  className="rounded-xl w-full h-full "
                  src={post?.postImage}
                  alt=""
                />
              </figure>
            </div>
            <div className="details py-3 lg:py-4">
              {/* <p>{post?.description.slice(0, 300)}</p> */}
            </div>
          </div>

          <div className="card-actions justify-end">
            <div className=" react-button flex gap-5">
              <Link _id={post?._id} to={`/post/${post?._id}`}>
                <button
                  _id={post?._id}
                  className="btn btn-wide col-span-3 bg-blue-500 text-white rounded-full"
                >
                  View Details
                </button>
              </Link>
              <div className="join join-vertical lg:join-horizontal">
                <button
                  onClick={() => handleUpVote(post)}
                  className="btn  rounded-l-full"
                >
                  <span>
                    <FaAngleDoubleUp />
                  </span>
                  {post?.upVote}
                </button>

                <button
                  onClick={() => handleDownVote(post)}
                  className="btn rounded-r-full"
                >
                  <span>
                    <FaAngleDoubleDown />
                  </span>
                  {post?.downVote}
                </button>
              </div>

              <div className="commnt">
                <button className="btn rounded-full">
                  <span className="flex justify-center gap-3 items-center">
                    <FaRegCommentDots /> <span>{post?.comments}</span>
                  </span>
                </button>
              </div>
              <div className="share">
                <span className="flex justify-center gap-3 items-center">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round={true}></FacebookIcon>
                  </FacebookShareButton>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round={true}></WhatsappIcon>
                  </WhatsappShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round={true}></TwitterIcon>
                  </TwitterShareButton>
                </span>
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
          {user?.displayName ? (
            <>
              <Link _id={post?._id} to={`/post/${post?._id}`}>
                <button
                  _id={post?._id}
                  className="btn  col-span-3 bg-blue-500 text-white rounded-full"
                >
                  Add Comment
                </button>
              </Link>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn col-span-3 bg-blue-500 text-white rounded-full"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
