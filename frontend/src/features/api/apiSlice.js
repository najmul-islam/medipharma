import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const accessToken = getState()?.auth?.user?.accessToken;
    const refreshToken = getState()?.auth?.user?.refreshToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    if (refreshToken) {
      headers.set("Refresh-Token", refreshToken);
    }

    return headers;
  },
});

const baseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/user/refresh-token",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch({
        type: "auth/setToken",
        payload: refreshResult.data.token,
      });

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
