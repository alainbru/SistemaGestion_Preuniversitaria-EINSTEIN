from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


asignacion_bp = Blueprint(
    "asignacion",
    __name__,
    url_prefix="/api/asignaciones"
)



# ===============================
# ASIGNAR DOCENTE A CURSO
# ===============================
@asignacion_bp.route("/", methods=["POST"])
def asignar_docente_curso():

    datos = request.json

    conexion = obtener_conexion()
    cursor = conexion.cursor()


    cursor.callproc(
        "sp_asignar_docente_curso",
        [
            datos["id_docente"],
            datos["id_curso"]
        ]
    )


    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Docente asignado al curso correctamente"
    }),201



# ===============================
# LISTAR ASIGNACIONES
# ===============================
@asignacion_bp.route("/", methods=["GET"])
def listar_asignaciones():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_docente_curso"
    )


    datos=[]


    for resultado in cursor.stored_results():

        datos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(datos)