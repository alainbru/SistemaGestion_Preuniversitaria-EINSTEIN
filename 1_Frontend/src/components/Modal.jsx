function Modal({ children, cerrar }) {

    return (

        <div className="modal-overlay">

            <div className="modal-contenido">


                <button
                    className="modal-cerrar"
                    onClick={cerrar}
                >
                    ✖
                </button>


                {children}


            </div>


        </div>

    );

}


export default Modal;