import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaEnvelope } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/PostCard/PostCard";

const MyProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    data: posts = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile-post"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myposts?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="w-60 rounded-full">
            <img src={user?.photoURL} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Hi!{" "}
              <span className="text-3xl font-bold">{user?.displayName}</span>{" "}
            </h2>
            <p className="flex items-center gap-3">
              <FaEnvelope></FaEnvelope> {user?.email}
            </p>
            <div className="card-actions justify-end">
              {/* <button className="btn btn-primary">Watch</button> */}
            </div>
          </div>
        </div>
        <div className="post">
          <h2 className=" text-xl lg:text-3xl font-semibold py-3">
            Your Recent Posts 3/{posts?.length}
          </h2>
          {posts.length > 3 ? (
            <>
              {posts?.slice(0, 3).map((post, key) => (
                <PostCard key={key} post={post}></PostCard>
              ))}
            </>
          ) : (
            <>
              {posts?.map((post, key) => (
                <PostCard key={key} post={post}></PostCard>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
