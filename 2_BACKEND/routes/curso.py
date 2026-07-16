from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


curso_bp = Blueprint(
    "curso",
    __name__,
    url_prefix="/api/cursos"
)


# ===============================
# REGISTRAR CURSO
# ===============================
@curso_bp.route("/", methods=["POST"])
def registrar_curso():

    datos=request.json

    conexion=obtener_conexion()
    cursor=conexion.cursor()


    cursor.callproc(
        "sp_registrar_curso",
        [
            datos["nombre_curso"],
            datos["descripcion"]
        ]
    )


    conexion.commit()

    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Curso registrado correctamente"
    }),201



# ===============================
# LISTAR CURSOS
# ===============================
@curso_bp.route("/", methods=["GET"])
def listar_cursos():

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_listar_cursos"
    )


    cursos=[]

    for resultado in cursor.stored_results():

        cursos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(cursos)



# ===============================
# BUSCAR CURSO
# ===============================
@curso_bp.route("/buscar/<dato>", methods=["GET"])
def buscar_curso(dato):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_buscar_curso",
        [dato]
    )


    cursos=[]

    for resultado in cursor.stored_results():

        cursos=resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(cursos)



# ===============================
# OBTENER CURSO
# ===============================
@curso_bp.route("/<int:id_curso>", methods=["GET"])
def obtener_curso(id_curso):

    conexion=obtener_conexion()

    cursor=conexion.cursor(dictionary=True)


    cursor.callproc(
        "sp_obtener_curso",
        [id_curso]
    )


    curso=None


    for resultado in cursor.stored_results():

        curso=resultado.fetchone()


    cursor.close()
    conexion.close()


    return jsonify(curso)



# ===============================
# ACTUALIZAR CURSO
# ===============================
@curso_bp.route("/<int:id_curso>", methods=["PUT"])
def actualizar_curso(id_curso):

    datos=request.json

    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_actualizar_curso",
        [
            id_curso,
            datos["nombre_curso"],
            datos["descripcion"],
            datos["estado"]
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Curso actualizado correctamente"
    })



# ===============================
# DESACTIVAR CURSO
# ===============================
@curso_bp.route("/<int:id_curso>", methods=["DELETE"])
def desactivar_curso(id_curso):

    conexion=obtener_conexion()

    cursor=conexion.cursor()


    cursor.callproc(
        "sp_desactivar_curso",
        [
            id_curso
        ]
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje":"Curso desactivado correctamente"
    })