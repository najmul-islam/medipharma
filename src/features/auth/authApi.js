import { apiSlice } from "../api/apiSlice";
import { login, register, resendCode } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data) {
            dispatch(register(result.data));
          }
        } catch (error) {}
      },
    }),

    resendCode: builder.query({
      query: (data) => ({
        url: `/user/resend-code?email=${data}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);
          if (result && result?.data) {
            dispatch(resendCode(result.data));
          }
        } catch (error) {}
      },
    }),

    verifyCode: builder.mutation({
      query: (data) => ({
        url: `/user/verify-code`,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data?.isVerified && result?.data?.accessToken) {
            dispatch(login(result.data));
          }
        } catch (error) {}
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyCodeMutation,
  useResendCodeQuery,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
