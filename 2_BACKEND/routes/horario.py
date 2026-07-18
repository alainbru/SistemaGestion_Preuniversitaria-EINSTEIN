from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


horario_bp = Blueprint(
    "horario",
    __name__,
    url_prefix="/api/horarios"
)


# REGISTRAR HORARIO
@horario_bp.route("/", methods=["POST"])
def registrar_horario():

    datos=request.json

    conexion=obtener_conexion()
    cursor=conexion.cursor()


    cursor.callproc(
        "sp_registrar_horario",
        [
            datos["dia"],
            datos["hora_inicio"],
            datos["hora_fin"],
            datos["id_docente_curso"],
            datos["id_aula"]
        ]
    )


    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Horario registrado correctamente"
    }),201



# LISTAR HORARIOS
@horario_bp.route("/", methods=["GET"])
def listar_horarios():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_horarios"
    )


    horarios=[]


    for resultado in cursor.stored_results():

        horarios=resultado.fetchall()

    # Convertir timedelta a string
    for horario in horarios:
        for campo, valor in horario.items():
            if hasattr(valor, "total_seconds"):
                horario[campo] = str(valor)
    cursor.close()
    conexion.close()


    return jsonify(horarios)