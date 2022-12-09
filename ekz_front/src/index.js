import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import App from './App';
import User from "./components/User";
import Event from "./components/Event";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/:IdOfUser",
        element: <User/>,
    },
    {
        path: "/Calendar/:IdOfEvent",
        element: <Event/>,
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

