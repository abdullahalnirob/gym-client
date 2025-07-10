import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../components/RootLayout";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import AllTriners from "../components/AllTriners";
import Trainer from "../components/Trainer";
import PrivateRoute from "./PrivateRoute";
import TrainerBookedPage from "../components/TrainerBookedPage";
import BecomeTrainer from "../components/BecomeTrainer";
import Dashboard from "../Dashboard/Dashboard";
import AppliedTrainers from "../Dashboard/AppliedTrainers";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        Component: RootLayout,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Register,
      },
      {
        path: "/alltrainers",
        Component: AllTriners,
      },
      {
        path: "/trainers/:id",
        Component: Trainer,
      },
      {
        path: "/trainer-booked-page/:id",
        element: (
          <PrivateRoute>
            <TrainerBookedPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/become-trainer",
        element: (
          <PrivateRoute>
            <BecomeTrainer />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/applied-trainers",
        element: (
          <PrivateRoute>
            <AppliedTrainers />
          </PrivateRoute>
        ),
      },
    ]
  },

]);
