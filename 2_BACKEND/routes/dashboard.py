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

# ===============================
# ASISTENCIA MENSUAL
# ===============================

@dashboard_bp.route("/asistencia", methods=["GET"])
def asistencia_mensual():


    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)



    sql = """

    SELECT

        MONTH(fecha) AS mes,

        COUNT(*) AS total,

        SUM(
            CASE
                WHEN estado_asistencia='Presente'
                THEN 1
                ELSE 0
            END
        ) AS presentes


    FROM asistencia

    GROUP BY MONTH(fecha)

    ORDER BY mes


    """


    cursor.execute(sql)


    datos = cursor.fetchall()



    for d in datos:

        d["porcentaje"] = round(
            (d["presentes"] / d["total"]) * 100,
            2
        )



    cursor.close()

    conexion.close()



    return jsonify(datos)