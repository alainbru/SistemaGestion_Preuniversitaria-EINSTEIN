from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


calificacion_bp = Blueprint(
    "calificacion",
    __name__,
    url_prefix="/api/calificaciones"
)



# REGISTRAR CALIFICACION
@calificacion_bp.route("/", methods=["POST"])
def registrar_calificacion():

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_registrar_calificacion",
        (
            datos["nota"],
            datos["id_estudiante"],
            datos["id_evaluacion"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Calificación registrada correctamente"
    }), 201


# LISTAR CALIFICACIONES
@calificacion_bp.route("/", methods=["GET"])
def listar_calificaciones():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc("sp_listar_calificaciones")

    calificaciones = []

    for resultado in cursor.stored_results():
        calificaciones = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(calificaciones)


# OBTENER CALIFICACION
@calificacion_bp.route("/<int:id_calificacion>", methods=["GET"])
def obtener_calificacion(id_calificacion):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_obtener_calificacion",
        (id_calificacion,)
    )

    calificacion = None

    for resultado in cursor.stored_results():
        calificacion = resultado.fetchone()

    cursor.close()
    conexion.close()

    return jsonify(calificacion)


# CALIFICACIONES DE UN ESTUDIANTE
@calificacion_bp.route("/estudiante/<int:id_estudiante>", methods=["GET"])
def calificaciones_estudiante(id_estudiante):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_calificaciones_estudiante",
        (id_estudiante,)
    )

    calificaciones = []

    for resultado in cursor.stored_results():
        calificaciones = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(calificaciones)


# CALIFICACIONES DE UNA EVALUACION
@calificacion_bp.route("/evaluacion/<int:id_evaluacion>", methods=["GET"])
def calificaciones_evaluacion(id_evaluacion):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_calificaciones_evaluacion",
        (id_evaluacion,)
    )

    calificaciones = []

    for resultado in cursor.stored_results():
        calificaciones = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(calificaciones)


# ACTUALIZAR CALIFICACION
@calificacion_bp.route("/<int:id_calificacion>", methods=["PUT"])
def actualizar_calificacion(id_calificacion):

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_actualizar_calificacion",
        (
            id_calificacion,
            datos["nota"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Calificación actualizada correctamente"
    })


# ELIMINAR CALIFICACION
@calificacion_bp.route("/<int:id_calificacion>", methods=["DELETE"])
def eliminar_calificacion(id_calificacion):

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_eliminar_calificacion",
        (id_calificacion,)
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Calificación eliminada correctamente"
    })