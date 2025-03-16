import { useContext } from "react";
import Announcement from "../../components/Announcement/Announcement";
import PostCard from "../../components/PostCard/PostCard";
import PostLayout from "../../components/PostLayout/PostLayout";
import usePost from "../../hooks/usePost";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { user, setAnu } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: posts = [],
    isPending: loading,
    refetch: reFetchPost,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/posts");
      return res.data;
    },
  });

  const {
    data: resAnnouncement = [],
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/announcement`);
      return res.data;
    },
  });
  setAnu(resAnnouncement?.length);

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
      <div>
        <div className={resAnnouncement ? "flex flex-col gap-3 py-4 " : "hide"}>
          <h2 className="text-3xl text-center text-red-500">Announcement</h2>

          {resAnnouncement?.map((announcement, idx) => (
            <Announcement announcement={announcement} key={idx}></Announcement>
          ))}
        </div>
        {/* <PostLayout /> */}
        <div className="main-post-box w-8/12 mx-auto  py-4">
          <div className="search flex justify-end gap-2 items-center">
            <h2>Short By: </h2>
            <select className="select select-info w-full max-w-xs">
              <option selected>Default</option>
              <option>New to Old</option>
              <option>Popularity</option>
            </select>
          </div>
          <div>
            {posts?.map((post) => (
              <PostCard key={post?._id} post={post} reFetchPost={reFetchPost} />
            ))}
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
