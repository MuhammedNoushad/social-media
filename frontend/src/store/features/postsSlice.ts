import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPosts, { PostState } from "../../types/IPosts";
import IComment from "../../types/IComment";

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<IPosts[]>) {
      state.posts = action.payload;
    },
    clearPosts(state) {
      state.posts = [];
    }, addComment(
      state,
      action: PayloadAction<{ postId: string; comment: IComment }>
    ) {
      const { postId, comment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);

      if (postIndex !== -1) {
        state.posts[postIndex].comments?.push(comment);
      }
    },
  },
});

export const { setPosts, clearPosts , addComment } = postSlice.actions;
export default postSlice.reducer;
