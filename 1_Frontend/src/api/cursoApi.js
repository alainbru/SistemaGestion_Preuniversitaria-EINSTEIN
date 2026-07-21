import api from "./api";


// LISTAR
export const listarCursos = () => {
    return api.get("/cursos/");
};


// REGISTRAR
export const registrarCurso = (datos) => {
    return api.post("/cursos/", datos);
};


// BUSCAR
export const buscarCurso = (dato) => {
    return api.get(`/cursos/buscar/${dato}`);
};


// OBTENER POR ID
export const obtenerCurso = (id) => {
    return api.get(`/cursos/${id}`);
};


// ACTUALIZAR
export const actualizarCurso = (id, datos) => {
    return api.put(`/cursos/${id}`, datos);
};


// ELIMINAR (DESACTIVAR)
export const eliminarCurso = (id) => {
    return api.delete(`/cursos/${id}`);
};