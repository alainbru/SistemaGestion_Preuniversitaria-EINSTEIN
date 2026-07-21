import api from "./api";

// LISTAR
export const listarMatriculas = () => {

    return api.get("/matriculas/");

};

// REGISTRAR
export const registrarMatricula = (datos) => {

    return api.post("/matriculas/", datos);
};

// ACTUALIZAR
export const actualizarMatricula = (id, datos) => {

    return api.put(`/matriculas/${id}`, datos);
};

// ANULAR
export const anularMatricula = (id) => {

    return api.put(`/matriculas/${id}/anular`);
};