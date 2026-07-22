import api from "./api";
// LISTAR
export const listarAsistencias = () => {
    return api.get("/asistencias/");
};

// REGISTRAR
export const registrarAsistencia = (datos) => {
    return api.post("/asistencias/", datos);
};

// OBTENER POR ID
export const obtenerAsistencia = (id) => {
    return api.get(`/asistencias/${id}`);
};

// ASISTENCIAS POR ESTUDIANTE
export const asistenciaPorEstudiante = (id_estudiante) => {
    return api.get(`/asistencias/estudiante/${id_estudiante}`);
};


// ASISTENCIAS POR GRUPO
export const asistenciaPorGrupo = (id_grupo) => {
    return api.get(`/asistencias/grupo/${id_grupo}`);
};



// ACTUALIZAR
export const actualizarAsistencia = (id, datos) => {
    return api.put(`/asistencias/${id}`, datos);

};


// ELIMINAR
export const eliminarAsistencia = (id) => {
    return api.delete(`/asistencias/${id}`);

};