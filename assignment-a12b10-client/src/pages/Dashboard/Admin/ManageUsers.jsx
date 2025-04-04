import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import './ManageUsers.css';

const ManageUsers = () => {

    // manage user pagination
    const [usersCount, setUserscount] = useState(0)
    const [itemsperPage, setitemsperPage] =useState(5);
    const [currentPage, setCurrentPage] = useState(0)
    // const [users, setUsers] = useState([])
  
    const pages = Math.ceil(usersCount/itemsperPage)
    console.log(pages, "totalcount")
    const pagesArr = [...Array(pages).keys()]
    console.log(pagesArr)

  const axiosPublic = useAxiosPublic();
  const {
    data: usersData = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?page=${currentPage}&size=${itemsperPage}`);
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



  const handlePrevPage=()=>{
    if(currentPage>0){
        setCurrentPage(currentPage-1)
        refetch()
    }
}

const handleNextPage=()=>{
    if(currentPage<pages-1){
        setCurrentPage(currentPage+1)
        refetch()
    }
}

const handleItemperPage=e=>{
  console.log(e.target.value)
  const val =parseInt (e.target.value)
  setitemsperPage(val)
  setCurrentPage(0)
  refetch()
}

  useEffect(()=>{
    fetch('https://assignment-a12b10-server-n.vercel.app/userscount')
    .then(res=>res.json())
    .then(data=>setUserscount(data.count))

  },[])

//   useEffect(() => {
//     fetch(`http://localhost:5000/users?page=${currentPage}&size=${itemsperPage}`)
//         .then(res => res.json())
//         .then(data => setUsers(data))
// }, [currentPage,itemsperPage]);

 
  


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
        <h2 className="text-3xl font-bold">Total Users: {usersCount}</h2>
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
        <div className="pagination">
                {/* <p>current page: {currentPage}</p> */}

                <button onClick={handlePrevPage}>Prev</button>
                {
                    pagesArr?.map(number=><button className={currentPage===number ? "selected": ""}

                    onClick={()=> {
                      setCurrentPage(number)
                      refetch()
                    
                    }}                         
                            key={number}>{number}</button>)
                }
                <button onClick={handleNextPage}>Next</button>

                <select value={itemsperPage} onChange={handleItemperPage} name='' id=''>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    
                </select>

            </div>
      </div>
    </div>
  );
};

export default ManageUsers;
