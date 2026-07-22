import api from "./api";


export const listarHistorialPagos = () => {

    return api.get("/historial-pagos/");

};