import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { NotificationType } from "../../types";

const cookies = new Cookies();
const profileId = cookies.get("profileId");
const socket_url = import.meta.env.VITE_SOCKET_URL;

interface NotificationState {
  notifications: Array<NotificationType>;
  content:
    | "newSubscription"
    | "unSubscription"
    | "apiHosted"
    | "apiDown"
    | null;
  isRead: boolean;
}

const initialState: NotificationState = {
    content: null,
    notifications: [],
    isRead: false,
}
export const getNotifications = createAsyncThunk('/getNotifications', async(_, thunkAPI) => {
    const headers = { 'X-Zapi-Auth-Token': `Bearer ${cookies.get('accessToken')}` }
    try {
      const response = await fetch(
        `${socket_url}/api/v1/notification/allNotifications${profileId}`,
        { headers }
      );
      const data = await response.json();
      const notification = data?.data;

      return notification;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotification: (state, action: PayloadAction<any>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.unshift(action.payload);
    },
    // removeNotification: (state, action: PayloadAction<any>) => {
    //     const profileId = action.payload
    //     state.notifications = state.notifications.filter(notification => notification.profileId !== profileId)
    // },
    markAsRead: (state, action: PayloadAction<any>) => {
      const item = state.notifications.find((item) => (item.isRead = true));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, () => {}),
      builder.addCase(
        getNotifications.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.notifications = action.payload;
        }
      ),
      builder.addCase(getNotifications.rejected, () => {});
  },
});

export const { allNotification, addNotification, markAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
