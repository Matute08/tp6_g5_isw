import React, { useState } from "react";
import { Card, Form, Alert,FloatingLabel } from "react-bootstrap";

function Busqueda({
    searchTerm,
    onSearchChange,
    onNextStep,
    onImageSelected,
}) {
    const [searchError, setSearchError] = useState(false); // Estado para controlar el error

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            // Cuando se selecciona una imagen, llama a la función onImageSelected con la URL de la imagen
            onImageSelected(event.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleNextStep = () => {
        // Validar si el campo de búsqueda está vacío
        if (!searchTerm.trim()) {
            setSearchError(true);
        } else {
            setSearchError(false);
            onNextStep();
        }
    };

    return (
        <div className="d-flex justify-content-center m-3">
            <Card className=" card-responsive">
                <Card.Header className="text-center">
                    <h2>Búsqueda de Producto</h2>
                </Card.Header>

                <Card.Body>
                    {/* QUE DEBE BUSCAR EL CADETE */}
                    <Form.Group>
                       
                        <FloatingLabel
                            controlId="floatingInput"
                            label="¿Qué debe buscar el Cadete? *"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Qué deseas buscar"
                                value={searchTerm}
                                onChange={onSearchChange}
                                isInvalid={searchError} // Aplicar estilo de error si searchError es true
                            />
                            {/* Mostrar un mensaje de error si searchError es true */}
                            {searchError && (
                                <Form.Control.Feedback type="invalid">
                                    Debes ingresar un producto.
                                </Form.Control.Feedback>
                            )}
                        </FloatingLabel>
                    </Form.Group>

                    {/* IMAGEN OPCIONAL */}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>
                            Ingrese una imagen representativa (Opcional):
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*" // Asegúrate de que solo se puedan seleccionar imágenes
                            onChange={handleImageSelect}
                        />
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                    <button onClick={handleNextStep}>Siguiente</button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Busqueda;
