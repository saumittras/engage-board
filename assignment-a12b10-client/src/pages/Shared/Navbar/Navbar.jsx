import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaBalanceScaleLeft, FaHome, FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { AuthContext } from "../../../providers/AuthProvider";

const Navbar = () => {
  const user = useAuth();

  const [sortedPost, setSortedPost] = useState([]);
  const { logOut, anounc } = useContext(AuthContext);

  useEffect(() => {
    fetch("post.json")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(a?.postTime) - new Date(b?.postTime)
        );
        const sortedDatad = data.sort(
          (a, b) => new Date(b?.postTime) - new Date(a?.postTime)
        );

        setSortedPost(sortedData);
      });
  }, []);

  const link = (
    <>
      <Link
        to={"/"}
        className="flex justify-center items-center gap-2 text-xl pr-6"
      >
        <FaHome /> <span>Home</span>
      </Link>
      <Link
        to={"/"}
        className="flex justify-center items-center gap-2 text-xl pr-6"
      >
        <FaRegUserCircle />
        <span>Membership</span>
      </Link>
      <Link
        to={"/"}
        className="flex justify-center items-center gap-2 text-xl pr-6"
      >
        <IoIosNotifications className={anounc ? "text-red-600" : ""} />
        <span className="">{anounc}</span>
      </Link>
    </>
  );
  // const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            <span className="text-blue-900 text-4xl ">E</span>
            <span className="hidden lg:flex">ngage</span>
            <span className="text-red-700 text-4xl">B</span>
            <span className="hidden lg:flex">oard</span>
          </Link>
        </div>

        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}

          <div className="flex justify-around items-center">
            {link}

            {user?.user?.displayName ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt={user?.user?.displayName && user?.user?.displayName}
                        src={
                          user?.user?.photoURL
                            ? user?.user?.photoURL
                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <p className="text-gray-300">{user?.user?.displayName}</p>
                    </li>
                    <li>
                      <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li>
                      {user?.user?.displayName ? (
                        <>
                          {/* <span>{user?.displayName}</span> */}
                          <li>
                            <Link onClick={handleLogOut}>Logout</Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/login">Login</Link>
                          </li>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to={"/signup"} className="text-xl">
                  Join Us
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
