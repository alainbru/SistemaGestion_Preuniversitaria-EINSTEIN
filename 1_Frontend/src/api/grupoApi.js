import api from "./api";


// LISTAR
export const listarGrupos = () => {

    return api.get("/grupos/");

};


// REGISTRAR
export const registrarGrupo = (datos) => {

    return api.post("/grupos/", datos);

};


// BUSCAR
export const buscarGrupo = (dato) => {

    return api.get(`/grupos/buscar/${dato}`);

};