import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaRegEdit, FaCalendar, FaHome, FaList, FaUsers } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const Dashboars = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin);
  if (isAdminLoading) {
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
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-00">
        <ul className="menu p-4 text-white">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile">
                  <FaHome></FaHome>
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reports">
                  <FaList></FaList>
                  Reported Comments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcement">
                  <MdAnnouncement />
                  Make Announcement
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaHome></FaHome>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addpost">
                  <FaRegEdit></FaRegEdit>
                  Add Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mypost">
                  <FaList></FaList>
                  My Posts
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboars;
