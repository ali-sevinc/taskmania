import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../utils/types";

const fakeUser = {
  userId: "123",
  userName: "shepherd",
  email: "test@test.com",
  password: "test123",
  isLogin: false,
  isPremium: false,
  customTags: ["education", "work"],
  list: [
    {
      date: "2023-12-04",
      id: "1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima tenetur nisi dolor quaerat adipisci nobis eaque, exercitationem dicta porro architecto quis enim perspiciatis quod! Dicta beatae quas dolores perferendis placeat.",
      isComplete: false,
      title: "An important to-do",
      tags: ["education"],
    },
  ],
};

interface UsersType {
  userId: string;
  userName: string;
  email: string;
  password: string;
  isLogin: boolean;
  isPremium: boolean;
  list: Task[];
  customTags: string[];
}

interface UserState {
  users: UsersType[];
}
const initialState: UserState = {
  users: [fakeUser],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<UsersType>) => {
      //console.log(action.payload);
      state.users.push(action.payload);
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.users = state.users.map((user) =>
        user.email === action.payload.email &&
        user.password === action.payload.password
          ? { ...user, isLogin: true }
          : user,
      );
    },
    logout: (state) => {
      state.users = state.users.map((user) => ({ ...user, isLogin: false }));
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const loggedUser = state.users.find((user) => user.isLogin);
      if (
        !loggedUser?.isPremium &&
        loggedUser?.list &&
        loggedUser?.list.length > 4
      ) {
        return;
      }
      state.users = state.users.map((user) =>
        user.isLogin === true
          ? { ...user, list: [...user.list, action.payload] }
          : user,
      );
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.map((user) =>
        user.isLogin === true
          ? {
              ...user,
              list: user.list.filter((i) => i.id !== action.payload.id),
            }
          : user,
      );
    },
    completeTask: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.map((user) =>
        user.isLogin === true
          ? {
              ...user,
              list: user.list.map((i) =>
                i.id === action.payload.id ? { ...i, isComplete: true } : i,
              ),
            }
          : user,
      );
    },
    upgratePremium: (state) => {
      state.users = state.users.map((user) =>
        user.isLogin === true ? { ...user, isPremium: true } : user,
      );
    },
    addUserTag: (state, action: PayloadAction<{ tag: string }>) => {
      const loggedUser = state.users.find((user) => user.isLogin);
      if (loggedUser?.customTags?.includes(action.payload.tag)) return;
      state.users = state.users.map((user) =>
        user.isLogin === true
          ? {
              ...user,
              customTags: [...user.customTags, action.payload.tag],
            }
          : user,
      );
    },
    removeUserTag: (state, action: PayloadAction<{ tag: string }>) => {
      state.users = state.users.map((user) =>
        user.isLogin === true
          ? {
              ...user,
              customTags: user.customTags.filter(
                (i) => i !== action.payload.tag,
              ),
            }
          : user,
      );
    },
  },
});

export const {
  addTask,
  signup,
  completeTask,
  login,
  logout,
  removeTask,
  upgratePremium,
  addUserTag,
  removeUserTag,
} = userSlice.actions;
export default userSlice.reducer;
