from flask import Blueprint, request, jsonify
from conexion import obtener_conexion


matricula_bp = Blueprint(
    "matricula",
    __name__,
    url_prefix="/api/matriculas"
)


# REGISTRAR MATRÍCULA
@matricula_bp.route("/", methods=["POST"])
def registrar_matricula():

    datos = request.json

    fecha_matricula = datos["fecha_matricula"]
    fecha_inicio = datos["fecha_inicio"]
    fecha_fin = datos["fecha_fin"]
    id_estudiante = datos["id_estudiante"]
    id_ciclo = datos["id_ciclo"]
    id_grupo = datos["id_grupo"]


    conexion = obtener_conexion()

    cursor = conexion.cursor()


    cursor.callproc(
        "sp_registrar_matricula",
        (
            fecha_matricula,
            fecha_inicio,
            fecha_fin,
            id_estudiante,
            id_ciclo,
            id_grupo
        )
    )


    conexion.commit()


    cursor.close()
    conexion.close()


    return jsonify({
        "mensaje": "Matrícula registrada correctamente"
    }), 201
    
    
    
    # LISTAR MATRICULAS
@matricula_bp.route("/", methods=["GET"])
def listar_matriculas():

    conexion = obtener_conexion()

    cursor = conexion.cursor(dictionary=True)

    cursor.callproc(
        "sp_listar_matriculas"
    )

    matriculas = []

    for resultado in cursor.stored_results():

        matriculas = resultado.fetchall()


    cursor.close()
    conexion.close()


    return jsonify(matriculas)


# ACTUALIZAR MATRICULA
@matricula_bp.route("/<int:id_matricula>", methods=["PUT"])
def actualizar_matricula(id_matricula):

    datos = request.get_json()

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_actualizar_matricula",
        (
            id_matricula,
            datos["fecha_matricula"],
            datos["fecha_inicio"],
            datos["fecha_fin"],
            datos["id_estudiante"],
            datos["id_ciclo"],
            datos["id_grupo"]
        )
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Matrícula actualizada correctamente"
    })
    
    
    
# ANULAR MATRICULA
@matricula_bp.route("/<int:id_matricula>/anular", methods=["PUT"])
def anular_matricula(id_matricula):

    conexion = obtener_conexion()
    cursor = conexion.cursor()

    cursor.callproc(
        "sp_anular_matricula",
        (id_matricula,)
    )

    conexion.commit()

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Matrícula anulada correctamente"
    })