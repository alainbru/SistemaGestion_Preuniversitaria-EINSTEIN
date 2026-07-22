from flask import Blueprint, jsonify
from conexion import obtener_conexion


log_pago_bp = Blueprint(
    "log_pago",
    __name__,
    url_prefix="/api/log-pagos"
)



@log_pago_bp.route("/", methods=["GET"])
def listar_log_pago():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_log_pago"
    )


    logs = []


    for resultado in cursor.stored_results():

        logs = resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(logs)