from flask import Blueprint, jsonify
from conexion import obtener_conexion


historial_bp = Blueprint(
    "historial",
    __name__,
    url_prefix="/api/historial-pagos"
)



@historial_bp.route("/", methods=["GET"])
def listar_historial_pagos():

    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    try:

        cursor.execute("""
            SELECT *
            FROM vista_historial_pagos
            ORDER BY fecha_pago DESC
        """)


        pagos = cursor.fetchall()


        return jsonify(pagos)


    except Exception as e:

        return jsonify({
            "error": str(e)
        }),500


    finally:

        cursor.close()
        conexion.close()