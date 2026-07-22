import api from "./api";


// LISTAR PAGOS ESTUDIANTES
export const listarPagosEstudiante = () => {

    return api.get("/pagos_estudiantes/");

};



// REGISTRAR PAGO ESTUDIANTE
export const registrarPagoEstudiante = (datos) => {

    return api.post("/pagos_estudiantes/", datos);

};



// OBTENER POR ID
export const obtenerPagoEstudiante = (id) => {

    return api.get(`/pagos_estudiantes/${id}`);

};



// PAGOS POR ESTUDIANTE
export const pagosPorEstudiante = (id_estudiante) => {

    return api.get(`/pagos_estudiantes/estudiante/${id_estudiante}`);

};



// ACTUALIZAR
export const actualizarPagoEstudiante = (id, datos) => {

    return api.put(`/pagos_estudiantes/${id}`, datos);

};