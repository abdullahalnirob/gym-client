import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RootLayout from "../components/RootLayout";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [{
            index: true,
            path: "/",
            Component: RootLayout
        }, {
            path: "/login",
            Component: Login
        }, {
            path: "/signup",
            Component: Register
        }
        ]
    }
])