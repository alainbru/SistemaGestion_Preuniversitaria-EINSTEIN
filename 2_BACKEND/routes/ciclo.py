from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


ciclo_bp = Blueprint(
    "ciclo",
    __name__,
    url_prefix="/api/ciclos"
)



# ===============================
# REGISTRAR CICLO
# ===============================
@ciclo_bp.route("/", methods=["POST"])
def registrar_ciclo():

    datos=request.json

    conexion=obtener_conexion()
    cursor=conexion.cursor()


    cursor.callproc(
        "sp_registrar_ciclo",
        [
            datos["nombre"],
            datos["fecha_inicio"],
            datos["fecha_fin"]
        ]
    )


    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Ciclo registrado correctamente"
    }),201



# ===============================
# LISTAR CICLOS
# ===============================
@ciclo_bp.route("/", methods=["GET"])
def listar_ciclos():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_ciclos"
    )


    ciclos=[]


    for resultado in cursor.stored_results():

        ciclos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(ciclos)



# ===============================
# BUSCAR CICLO
# ===============================
@ciclo_bp.route("/buscar/<dato>", methods=["GET"])
def buscar_ciclo(dato):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_buscar_ciclo",
        [dato]
    )


    ciclos=[]


    for resultado in cursor.stored_results():

        ciclos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(ciclos)



# ===============================
# ACTUALIZAR CICLO
# ===============================
@ciclo_bp.route("/<int:id_ciclo>", methods=["PUT"])
def actualizar_ciclo(id_ciclo):

    datos=request.json

    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_actualizar_ciclo",
        [
            id_ciclo,
            datos["nombre"],
            datos["fecha_inicio"],
            datos["fecha_fin"]
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Ciclo actualizado correctamente"
    })



# ===============================
# ELIMINAR CICLO
# ===============================
@ciclo_bp.route("/<int:id_ciclo>", methods=["DELETE"])
def eliminar_ciclo(id_ciclo):

    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_eliminar_ciclo",
        [
            id_ciclo
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Ciclo eliminado correctamente"
    })