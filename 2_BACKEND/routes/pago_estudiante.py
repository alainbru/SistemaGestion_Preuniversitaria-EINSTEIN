from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


pago_estudiante_bp = Blueprint(
    "pago_estudiante",
    __name__,
    url_prefix="/api/pagos_estudiantes"
)


# REGISTRAR PAGO ESTUDIANTE
@pago_estudiante_bp.route("/", methods=["POST"])
def registrar_pago_estudiante():

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()


    cursor.callproc(
        "sp_registrar_pago_estudiante",
        (
            datos["fecha_pago"],
            datos["monto"],
            datos["concepto"],
            datos["periodo_pagado"],
            datos["fecha_inicio_pago"],
            datos["fecha_fin_pago"],
            datos["id_estudiante"]
        )
    )


    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje": "Pago de estudiante registrado correctamente"
    }),201



# LISTAR PAGOS ESTUDIANTE
@pago_estudiante_bp.route("/", methods=["GET"])
def listar_pagos_estudiante():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_pagos_estudiante"
    )


    pagos=[]


    for resultado in cursor.stored_results():

        pagos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(pagos)



# OBTENER PAGO POR ID
@pago_estudiante_bp.route("/<int:id_pago>", methods=["GET"])
def obtener_pago_estudiante(id_pago):

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_obtener_pago_estudiante",
        (id_pago,)
    )


    pago=None


    for resultado in cursor.stored_results():

        pago=resultado.fetchone()


    cursor.close()
    conexion.close()


    return jsonify(pago)



# PAGOS DE UN ESTUDIANTE
@pago_estudiante_bp.route("/estudiante/<int:id_estudiante>", methods=["GET"])
def pagos_por_estudiante(id_estudiante):

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_pagos_por_estudiante",
        (id_estudiante,)
    )


    pagos=[]


    for resultado in cursor.stored_results():

        pagos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(pagos)



# ACTUALIZAR PAGO ESTUDIANTE
@pago_estudiante_bp.route("/<int:id_pago>", methods=["PUT"])
def actualizar_pago_estudiante(id_pago):

    datos=request.get_json()


    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_actualizar_pago_estudiante",
        (
            id_pago,
            datos["monto"],
            datos["concepto"],
            datos["estado"],
            datos["fecha_fin_pago"]
        )
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Pago de estudiante actualizado correctamente"
    })