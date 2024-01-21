import React from "react";

// ! Please add all pages as exotic components as below
export { default as HomePage } from "./Homepage"

// const Analytics = React.lazy(() => import("./Analytics"));
const Configuration = React.lazy(() => import("./Configuration"));
const DevDashboard = React.lazy(() => import("./DevDashboard"));
const DeveloperApiPage = React.lazy(() => import("./DeveloperApiPage"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const Home = React.lazy(() => import("./Home"));
const LoginHistory = React.lazy(() => import("./LoginHistory"));
const Otp = React.lazy(() => import("./Otp"));
const Signup = React.lazy(() => import('./Signup'));
const SuccessPage = React.lazy(() => import("./SuccessPage"));
const UserProfile = React.lazy(() => import("./UserProfile"));
const CreateEndpoint = React.lazy(() => import("./CreateEndpoint"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const TermsConditions = React.lazy(() => import("./TermsConditions"));
const Pricing = React.lazy(() => import("./Pricing"));
const Documentation = React.lazy(() => import("./Documentation"));
const APIHub = React.lazy(() => import("./APIHub"));
const Notifications = React.lazy(() => import("./Notifications"));
const ApiHubTry = React.lazy(() => import("./ApiHubTry"));
const ComingSoonPage = React.lazy(() => import("./ComingSoonPage"));
const APIMoreInfo = React.lazy(() => import("./APIMoreInfo"));
const SingleDiscussionPage = React.lazy(() => import("./SingleDiscussionPage"));

export { Configuration, CreateEndpoint,DeveloperApiPage, DevDashboard,
ForgotPassword, Home, LoginHistory, Otp, Signup, SuccessPage, UserProfile, 
TermsConditions, ResetPassword, Pricing, Documentation, APIHub, Notifications,ApiHubTry, ComingSoonPage, APIMoreInfo ,SingleDiscussionPage};
