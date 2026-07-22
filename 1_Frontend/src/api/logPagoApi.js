import api from "./api";


export const listarLogsPago = () => {

    return api.get("/logs-pagos/");

};