from flask import Blueprint, jsonify
from conexion import obtener_conexion

dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/dashboard"
)

# ===============================
# LISTAR DASHBOARD
# ===============================

@dashboard_bp.route("/", methods=["GET"])
def obtener_dashboard():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM vista_dashboard"
    )

    dashboard = cursor.fetchone()

    cursor.close()
    conexion.close()

    return jsonify(dashboard)