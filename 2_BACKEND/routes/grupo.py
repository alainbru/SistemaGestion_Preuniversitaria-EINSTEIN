from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


grupo_bp = Blueprint(
    "grupo",
    __name__,
    url_prefix="/api/grupos"
)


# REGISTRAR GRUPO
@grupo_bp.route("/", methods=["POST"])
def registrar_grupo():

    datos=request.json

    conexion=obtener_conexion()
    cursor=conexion.cursor()

    cursor.callproc(
        "sp_registrar_grupo",
        [
            datos["nombre_grupo"],
            datos["turno"],
            datos["id_ciclo"],
            datos["id_sede"]
        ]
    )

    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Grupo registrado correctamente"
    }),201



# LISTAR GRUPOS
@grupo_bp.route("/", methods=["GET"])
def listar_grupos():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_grupos"
    )


    grupos=[]

    for resultado in cursor.stored_results():

        grupos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(grupos)



# BUSCAR GRUPO
@grupo_bp.route("/buscar/<dato>", methods=["GET"])
def buscar_grupo(dato):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_buscar_grupo",
        [dato]
    )


    grupos=[]

    for resultado in cursor.stored_results():

        grupos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(grupos)