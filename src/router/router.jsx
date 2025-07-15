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
import AdminRoute from "./AdminRoute";
import TrainerRouter from "./TrainerRouter";
import AllUsers from "../Dashboard/AllUsers";
import AllTrainers from "../Dashboard/AllTrainers";
import AddClass from "../Dashboard/AddClass";
import AllClasses from "../components/AllClasses";
import DashboardAllClasses from "../Dashboard/DashboardAllClasses";
import ManageSlot from "../Dashboard/ManageSlot";
import AddSlot from "../Dashboard/AddSlot";
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
        path: "/classes",
        Component: AllClasses,
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
            <AdminRoute>
              <AppliedTrainers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-trainers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllTrainers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-class",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddClass />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/classes",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <DashboardAllClasses />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-slots",
        element: (
          <PrivateRoute>
            <TrainerRouter>
              <ManageSlot />
            </TrainerRouter>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-slot",
        element: (
          <PrivateRoute>
            <TrainerRouter>
              <AddSlot />
            </TrainerRouter>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
