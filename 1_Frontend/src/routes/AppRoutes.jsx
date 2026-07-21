import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Estudiantes from "../pages/Estudiantes";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes(){

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login/>}
                />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/estudiantes"
                    element={
                        <ProtectedRoute>
                            <Estudiantes/>
                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}


export default AppRoutes;