from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


pago_docente_bp = Blueprint(
    "pago_docente",
    __name__,
    url_prefix="/api/pagos_docentes"
)


# REGISTRAR PAGO DOCENTE
@pago_docente_bp.route("/", methods=["POST"])
def registrar_pago_docente():

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()


    cursor.callproc(
        "sp_registrar_pago_docente",
        (
            datos["fecha_pago"],
            datos["monto"],
            datos["concepto"],
            datos["id_docente"]
        )
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Pago docente registrado correctamente"
    }),201



# LISTAR PAGOS DOCENTE
@pago_docente_bp.route("/", methods=["GET"])
def listar_pagos_docente():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_pagos_docente"
    )


    pagos=[]


    for resultado in cursor.stored_results():

        pagos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(pagos)



# OBTENER PAGO DOCENTE
@pago_docente_bp.route("/<int:id_pago_docente>", methods=["GET"])
def obtener_pago_docente(id_pago_docente):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_obtener_pago_docente",
        (id_pago_docente,)
    )


    pago=None


    for resultado in cursor.stored_results():

        pago=resultado.fetchone()


    cursor.close()
    conexion.close()


    return jsonify(pago)



# PAGOS POR DOCENTE
@pago_docente_bp.route("/docente/<int:id_docente>", methods=["GET"])
def pagos_por_docente(id_docente):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_pagos_por_docente",
        (id_docente,)
    )


    pagos=[]


    for resultado in cursor.stored_results():

        pagos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(pagos)



# ACTUALIZAR PAGO DOCENTE
@pago_docente_bp.route("/<int:id_pago_docente>", methods=["PUT"])
def actualizar_pago_docente(id_pago_docente):

    datos=request.get_json()


    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_actualizar_pago_docente",
        (
            id_pago_docente,
            datos["monto"],
            datos["concepto"],
            datos["estado"]
        )
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Pago docente actualizado correctamente"
    })



# PAGOS PENDIENTES
@pago_docente_bp.route("/pendientes", methods=["GET"])
def pagos_docente_pendientes():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_pagos_docente_pendientes"
    )


    pagos=[]


    for resultado in cursor.stored_results():

        pagos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(pagos)



# TOTAL PAGADO DOCENTE
@pago_docente_bp.route("/total/<int:id_docente>", methods=["GET"])
def total_pagado_docente(id_docente):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_total_pagado_docente",
        (id_docente,)
    )


    total=None


    for resultado in cursor.stored_results():

        total=resultado.fetchone()


    cursor.close()
    conexion.close()


    return jsonify(total)