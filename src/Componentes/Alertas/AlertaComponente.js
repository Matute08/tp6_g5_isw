import React from 'react';
import Swal from 'sweetalert2';

function AlertComponent() {
    const mostrarAlert = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro ?',
            //text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, Confirmar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Pedido Enviado!',
                    'Tu Pedido ha sido enviado.',
                    'success'
                    
                ).then(() => {
                    // Recargar la página después de mostrar el SweetAlert
                    window.location.reload();
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Tu Pedido se ha cancelado',
                    'error'
                )
            }
        });
    };

    return (
        
        <button type="submit" onClick={mostrarAlert}>Enviar</button>
    );
}

export default AlertComponent;
