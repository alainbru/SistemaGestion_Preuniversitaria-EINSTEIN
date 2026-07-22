import api from "./api";


// Dashboard general
export const obtenerDashboard = () => {
    return api.get("/dashboard/");
};


// Asistencia mensual
export const obtenerAsistenciaMensual = () => {
    return api.get("/dashboard/asistencia");
};