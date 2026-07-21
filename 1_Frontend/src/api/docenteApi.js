import api from "./api";


// LISTAR
export const listarDocentes = () => {
    return api.get("/docentes/");
};


// REGISTRAR
export const registrarDocente = (datos) => {
    return api.post("/docentes/", datos);
};


// BUSCAR
export const buscarDocente = (dato) => {
    return api.get(`/docentes/buscar/${dato}`);
};


// OBTENER POR ID
export const obtenerDocente = (id) => {
    return api.get(`/docentes/${id}`);
};


// ACTUALIZAR
export const actualizarDocente = (id, datos) => {
    return api.put(`/docentes/${id}`, datos);
};


// ELIMINAR (RETIRAR)
export const eliminarDocente = (id) => {
    return api.delete(`/docentes/${id}`);
};