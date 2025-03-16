import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageUsers = () => {

  const axiosPublic = useAxiosPublic();
  const {
    data: usersData = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });


  const handleMakeAdmin = (user) => {
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
        axiosPublic.patch(`/users/admin/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  // manage user pagination
  const [usersCount, setUserscount] = useState()

  useEffect(()=>{
    fetch('http://localhost:5000/userscount')
    .then(res=>res.json())
    .then(data=>setUserscount(data.count))

  },[])

  const itemPerpage = 5;
  const totalPages = Math.ceil(usersCount/itemPerpage)
  // console.log(totalPages, "totalcount")
  const pagesArr = [...Array(totalPages).keys()]
  console.log(pagesArr)
  


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
      <div className="heading flex justify-between">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-3xl font-bold">Total Users: {usersData?.length}</h2>
      </div>
      <div className="table">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>SL No:</label>
                </th>
                <th>Name</th>
                <th>e-mail</th>
                <th>Action</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {usersData?.map((user, idx) => (
                <tr key={idx}>
                  <th>
                    <label>
                      <h2>{idx + 1}</h2>
                    </label>
                  </th>
                  <td>
                    <div className="flex items-start gap-3">
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="font-semibold">
                          {user?.role == "admin" ? "Admin" : "User"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-start gap-3">
                      <div>
                        <div className="font-semibold">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn"
                    >
                      Make Admin
                    </button>
                  </td>

                  <th>{user.membership ? "Gold" : "Bronze"}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
