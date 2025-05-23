import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";
import { toast } from "react-toastify";

// Mutation function
const followUser = async (username) => {
  const res = await apiRequest.post(`/users/follow/${username}`);
  return res.data;
};

const FollowButton = ({ isFollowing, username }) => {
  const { currentUser } = useAuthStore();
  if (!currentUser) {
    toast.error("Login to interact");
  }

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", username],
      });
    },
  });
  return (
    <button
      onClick={() => mutation.mutate(username)}
      disabled={mutation.isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
