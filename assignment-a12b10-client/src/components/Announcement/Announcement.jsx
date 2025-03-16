import React, { useContext } from "react";

const Announcement = ({ announcement }) => {
  console.log(announcement, "announcement card");
  return (
    <div className="w-8/12 mx-auto border rounded-xl">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="upper grid grid-cols-12 p-4 border gap-4 rounded-xl m-4">
          <div className="avatar col-span-1 ">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                alt={announcement?.authorName && announcement?.authorName}
                src={
                  announcement?.authorName
                    ? announcement?.authorImage
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>

          <div className=" col-span-11 ">
            <h2>{announcement?.title}</h2>
            <div className=" col-span-11 ">
              <h2>{announcement?.description}</h2>
            </div>
          </div>
        </div>

        <div className="">
          <div className="card-actions justify-end mb-4 mr-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
