from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


asistencia_bp = Blueprint(
    "asistencia",
    __name__,
    url_prefix="/api/asistencias"
)

#===============================
# REGISTRAR ASISTENCIA
@asistencia_bp.route("/", methods=["POST"])
def registrar_asistencia():

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_registrar_asistencia",
        (
            datos["fecha"],
            datos["estado_asistencia"],
            datos["id_estudiante"],
            datos["id_grupo"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Asistencia registrada correctamente"
    }), 201
    
#===============================
# LISTAR ASISTENCIAS
@asistencia_bp.route("/", methods=["GET"])
def listar_asistencias():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc("sp_listar_asistencias")

    asistencias = []

    for resultado in cursor.stored_results():
        asistencias = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(asistencias)

#===============================
# OBTENER ASISTENCIA POR ID
@asistencia_bp.route("/<int:id_asistencia>", methods=["GET"])
def obtener_asistencia(id_asistencia):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_obtener_asistencia",
        (id_asistencia,)
    )

    asistencia = None

    for resultado in cursor.stored_results():
        asistencia = resultado.fetchone()

    cursor.close()
    conexion.close()

    return jsonify(asistencia)


#==============================
# LISTAR ASISTENCIAS POR ESTUDIANTE 
@asistencia_bp.route("/estudiante/<int:id_estudiante>", methods=["GET"])
def asistencia_estudiante(id_estudiante):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_asistencia_estudiante",
        (id_estudiante,)
    )

    asistencias = []

    for resultado in cursor.stored_results():
        asistencias = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(asistencias)

#==============================
# LISTAR ASISTENCIAS POR GRUPO
@asistencia_bp.route("/grupo/<int:id_grupo>", methods=["GET"])
def asistencia_grupo(id_grupo):

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_asistencia_grupo",
        (id_grupo,)
    )

    asistencias = []

    for resultado in cursor.stored_results():
        asistencias = resultado.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(asistencias)

#==============================
# ACTUALIZAR ASISTENCIA
@asistencia_bp.route("/<int:id_asistencia>", methods=["PUT"])
def actualizar_asistencia(id_asistencia):

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_actualizar_asistencia",
        (
            id_asistencia,
            datos["estado_asistencia"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje":"Asistencia actualizada correctamente"
    })


#==============================
# ELIMINAR ASISTENCIA    
@asistencia_bp.route("/<int:id_asistencia>", methods=["DELETE"])
def eliminar_asistencia(id_asistencia):

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_eliminar_asistencia",
        (id_asistencia,)
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje":"Asistencia eliminada correctamente"
    })