import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PostLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-8/12 mx-auto border rounded-xl">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="upper grid grid-cols-12 p-4 border gap-4 rounded-full m-4">
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

          <div className=" col-span-11 ">
            <input
              type="text"
              placeholder="What is in your Mind?"
              className="input input-bordered rounded-full input-success w-full "
            />
          </div>
        </div>

        <div className="">
          <div className="card-actions justify-end mb-4 mr-4">
            <div className="badge py-4 px-6 badge-outline bg-blue-500 text-white cursor-pointer">
              Ask Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
