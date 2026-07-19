from flask import Blueprint, request, jsonify
from conexion import obtener_conexion
from datetime import timedelta

reportes_bp = Blueprint(
    "reporte",
    __name__,
    url_prefix="/api/reportes"
)





# DASHBOARD GENERAL
@reportes_bp.route("/dashboard", methods=["GET"])
def dashboard():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_dashboard"
    )


    resultado = cursor.fetchone()


    cursor.close()
    conexion.close()


    return jsonify(resultado)



# REPORTE DE ASISTENCIA
@reportes_bp.route("/asistencia", methods=["GET"])
def reporte_asistencia():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_asistencia"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# AUDITORIA DEL SISTEMA
@reportes_bp.route("/auditoria", methods=["GET"])
def auditoria():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_auditoria"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# DOCENTES Y CURSOS
@reportes_bp.route("/docentes-cursos", methods=["GET"])
def docentes_cursos():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_docentes_cursos"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# ESTADO FINANCIERO ESTUDIANTES
@reportes_bp.route("/estado-financiero", methods=["GET"])
def estado_financiero():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_estado_financiero"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# LISTADO ESTUDIANTES
@reportes_bp.route("/estudiantes", methods=["GET"])
def estudiantes():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_estudiantes"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# HISTORIAL PAGOS
@reportes_bp.route("/historial-pagos", methods=["GET"])
def historial_pagos():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_historial_pagos"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)


# HORARIOS
@reportes_bp.route("/horarios", methods=["GET"])
def horarios():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM vista_horarios"
    )

    datos = cursor.fetchall()


    for fila in datos:
        for clave, valor in fila.items():
            if isinstance(valor, timedelta):
                fila[clave] = str(valor)


    cursor.close()
    conexion.close()


    return jsonify(datos)



# MATRICULAS
@reportes_bp.route("/matriculas", methods=["GET"])
def matriculas():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_matriculas"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# PAGOS PENDIENTES
@reportes_bp.route("/pagos-pendientes", methods=["GET"])
def pagos_pendientes():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_pagos_pendientes"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)



# RENDIMIENTO ACADEMICO
@reportes_bp.route("/rendimiento-academico", methods=["GET"])
def rendimiento_academico():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM vista_rendimiento_academico"
    )


    datos = cursor.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)