import api from "./api";


export const listarActividades = () => {

    return api.get("/actividades/");

};