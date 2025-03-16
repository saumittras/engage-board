import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useMyPost = () => {
  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  console.log(user);
  const {
    isPending: isLoading,
    refetch,
    data: posts = [],
  } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts?email=${user?.email}`);
      console.log(res.data, "my post");
      return res.data;
    },
  });

  return [isLoading, posts, refetch];
};

export default useMyPost;
