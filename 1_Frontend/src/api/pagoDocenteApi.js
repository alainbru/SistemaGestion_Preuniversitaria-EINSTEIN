import api from "./api";


// LISTAR PAGOS DOCENTES
export const listarPagosDocente = () => {

    return api.get("/pagos_docentes/");

};



// REGISTRAR PAGO DOCENTE
export const registrarPagoDocente = (datos) => {

    return api.post("/pagos_docentes/", datos);

};



// OBTENER POR ID
export const obtenerPagoDocente = (id) => {

    return api.get(`/pagos_docentes/${id}`);

};



// PAGOS POR DOCENTE
export const pagosPorDocente = (id_docente) => {

    return api.get(`/pagos_docentes/docente/${id_docente}`);

};



// ACTUALIZAR
export const actualizarPagoDocente = (id, datos) => {

    return api.put(`/pagos_docentes/${id}`, datos);

};



// PAGOS PENDIENTES
export const pagosDocentePendientes = () => {

    return api.get("/pagos_docentes/pendientes");

};



// TOTAL PAGADO DOCENTE
export const totalPagadoDocente = (id_docente) => {

    return api.get(`/pagos_docentes/total/${id_docente}`);

};