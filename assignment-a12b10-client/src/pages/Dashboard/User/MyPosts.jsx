import React, { useContext } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const axiosPublic = useAxiosPublic();
  const {
    data: posts = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myposts?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/myposts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <>
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
      </>
    );
  }

  return (
    <div>
      <h2 className="text-3xl text-center font-bold  mb-4 py-4">
        My All Posts
      </h2>
      <div className="overflow-x-auto">
        <table className="table  w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>Number of Votes</th>
              <th>Comments BTN</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr key={post?._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <h2>{post?.title}</h2>
                    </div>
                  </div>
                </td>
                <td>{post?.upVote}</td>
                <td>
                  <NavLink to={`/details/${post?._id}`}>
                    <button className="btn btn-ghost btn-lg">Comment</button>
                  </NavLink>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(post?._id)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;
