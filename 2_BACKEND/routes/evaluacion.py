from flask import Blueprint, request, jsonify
from conexion import obtener_conexion

evaluacion_bp = Blueprint(
    "evaluacion",
    __name__,
    url_prefix="/api/evaluaciones"
)

# REGISTRAR EVALUACION
@evaluacion_bp.route("/", methods=["POST"])
def registrar_evaluacion():

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_registrar_evaluacion",
        (
            datos["nombre"],
            datos["tipo"],
            datos["fecha"],
            datos["id_curso"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Evaluación registrada correctamente"
    }), 201


# LISTAR EVALUACIONES
@evaluacion_bp.route("/", methods=["GET"])
def listar_evaluaciones():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_listar_evaluaciones"
    )

    evaluaciones = []

    for resultado in cursor.stored_results():
        evaluaciones = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(evaluaciones)


# OBTENER EVALUACION POR ID
@evaluacion_bp.route("/<int:id_evaluacion>", methods=["GET"])
def obtener_evaluacion(id_evaluacion):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_obtener_evaluacion",
        (id_evaluacion,)
    )

    evaluacion = None

    for resultado in cursor.stored_results():
        evaluacion = resultado.fetchone()

    cursor.close()
    conexion.close()

    return jsonify(evaluacion)


# LISTAR EVALUACIONES POR CURSO
@evaluacion_bp.route("/curso/<int:id_curso>", methods=["GET"])
def evaluaciones_curso(id_curso):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_evaluaciones_curso",
        (id_curso,)
    )

    evaluaciones = []

    for resultado in cursor.stored_results():
        evaluaciones = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(evaluaciones)


# ACTUALIZAR EVALUACION
@evaluacion_bp.route("/<int:id_evaluacion>", methods=["PUT"])
def actualizar_evaluacion(id_evaluacion):

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_actualizar_evaluacion",
        (
            id_evaluacion,
            datos["nombre"],
            datos["tipo"],
            datos["fecha"],
            datos["id_curso"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Evaluación actualizada correctamente"
    })


# ELIMINAR EVALUACION
@evaluacion_bp.route("/<int:id_evaluacion>", methods=["DELETE"])
def eliminar_evaluacion(id_evaluacion):

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_eliminar_evaluacion",
        (id_evaluacion,)
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Evaluación eliminada correctamente"
    })