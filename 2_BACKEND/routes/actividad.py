from flask import Blueprint, jsonify, request
from conexion import obtener_conexion


actividad_bp = Blueprint(
    "actividad",
    __name__,
    url_prefix="/api/actividades"
)


# =========================
# LISTAR ACTIVIDADES
# =========================

@actividad_bp.route("/", methods=["GET"])
def listar_actividades():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_actividades"
    )


    actividades = []


    for resultado in cursor.stored_results():

        actividades = resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(actividades)



# =========================
# REGISTRAR ACTIVIDAD
# =========================

@actividad_bp.route("/", methods=["POST"])
def registrar_actividad():

    datos = request.get_json()


    conexion = obtener_conexion()

    cursor = conexion.cursor()


    cursor.callproc(
        "sp_registrar_actividad",
        (
            datos["accion"],
            datos["descripcion"],
            datos["id_usuario"]
        )
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Actividad registrada correctamente"
    }),201