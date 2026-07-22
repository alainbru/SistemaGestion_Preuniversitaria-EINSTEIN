import api from "./api";


export const obtenerDashboard = () => {

    return api.get("/dashboard/");

};