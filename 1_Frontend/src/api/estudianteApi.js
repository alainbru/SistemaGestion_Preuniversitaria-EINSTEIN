import api from "./api";


// LISTAR
export const listarEstudiantes = () => {
    return api.get("/estudiantes/");
};


// REGISTRAR
export const registrarEstudiante = (datos) => {
    return api.post("/estudiantes/", datos);
};


// BUSCAR
export const buscarEstudiante = (dato) => {
    return api.get(`/estudiantes/buscar/${dato}`);
};


// ACTUALIZAR
export const actualizarEstudiante = (id, datos) => {
    return api.put(`/estudiantes/${id}`, datos);
};


// ELIMINAR
export const eliminarEstudiante = (id) => {
    return api.delete(`/estudiantes/${id}`);
};