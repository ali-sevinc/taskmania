import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";
import AllTasksPage from "./pages/AllTasksPage";
import TodayPage from "./pages/TodayPage";
import UpcomingPage from "./pages/UpcomingPage";
import DetailsPage from "./pages/DetailsPage";
import PaymentPage from "./pages/PaymentPage";
import TagSearchPage from "./pages/TagSearchPage";
import ErrorPage from "./pages/ErrorPage";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <RootPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/features", element: <FeaturesPage /> },
        { path: "/pricing", element: <PricingPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignupPage /> },
      ],
    },
    {
      path: "/app",
      errorElement: <ErrorPage />,
      element: <AppPage />,
      children: [
        { path: "projects", element: <AllTasksPage /> },
        { path: "today", element: <TodayPage /> },
        { path: "upcoming", element: <UpcomingPage /> },
        { path: "projects/:id", element: <DetailsPage /> },
        { path: "tags/:tag", element: <TagSearchPage /> },
        { path: "payment", element: <PaymentPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
