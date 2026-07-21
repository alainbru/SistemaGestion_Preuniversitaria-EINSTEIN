import api from "./api";


// LISTAR
export const listarCiclos = () => {

    return api.get("/ciclos/");

};


// REGISTRAR
export const registrarCiclo = (datos) => {

    return api.post("/ciclos/", datos);

};


// BUSCAR
export const buscarCiclo = (dato) => {

    return api.get(`/ciclos/buscar/${dato}`);

};


// ACTUALIZAR
export const actualizarCiclo = (id, datos) => {

    return api.put(`/ciclos/${id}`, datos);

};


// ELIMINAR
export const eliminarCiclo = (id) => {

    return api.delete(`/ciclos/${id}`);

};