import React, { useState } from "react";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";

function FormularioDireccionComercio({
    commerceAddress,
    commerceHeight,
    commerceCity,
    commerceReference,
    onCommerceAddressChange,
    onCommerceHeightChange,
    onCommerceCityChange,
    onCommerceReferenceChange,
    onPrevStep,
    onNextStep,
}) {
    const [addressError, setAddressError] = useState(false);
    const [heightError, setHeightError] = useState(false);
    const [cityError, setCityError] = useState(false);

    const isValidAddress = (address) => {
        return !!address.trim(); // Esta es una validación de no permitir direcciones vacías
    };
    const isValidHeight = (height) => {
        return !!height.trim(); // Esta es una validación de no permitir alturas vacías
    };

    const isValidCity = (city) => {
        return city != "Seleccione..."; // Verificar que la ciudad no sea "Seleccione..."
    };

    const handleNextStep = () => {
        const isAddressValid = isValidAddress(commerceAddress);
        const isHeightValid = isValidHeight(commerceHeight);
        const isCityValid = isValidCity(commerceCity);

        setAddressError(!isAddressValid);
        setHeightError(!isHeightValid);
        setCityError(!isCityValid);

        if (isAddressValid && isHeightValid && isCityValid) {
            onNextStep();
        }
    };

    return (
        <div className="d-flex justify-content-center m-5">
            <Card className=" card-responsive">
                <Card.Header className="text-center">
                    <h2>Dirección del Comercio</h2>
                </Card.Header>

                <Card.Body>
                    <Form.Group>
                        <Row>
                            <Col md={8}>
                                {/* DIRECCION DEL COMERCIO */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Dirección del Comercio"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Dirección del Comercio"
                                        type="text"
                                        value={commerceAddress}
                                        onChange={onCommerceAddressChange}
                                        isInvalid={addressError}
                                    />
                                    {addressError && (
                                        <Form.Control.Feedback type="invalid">
                                            Debes ingresar una dirección.
                                        </Form.Control.Feedback>
                                    )}
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                {/* ALTURA DEL COMERCIO */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Altura del Comercio"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Altura del Comercio"
                                        type="number"
                                        value={commerceHeight}
                                        onChange={onCommerceHeightChange}
                                        isInvalid={heightError}
                                    />
                                    {heightError && (
                                        <Form.Control.Feedback type="invalid">
                                            Debes ingresar una altura.
                                        </Form.Control.Feedback>
                                    )}
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* CIUDAD DEL COMERCIO */}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Ciudad del Comercio"
                            className="mb-3"
                        >
                            <Form.Select
                                value={commerceCity}
                                onChange={onCommerceCityChange}
                                isInvalid={cityError}
                            >
                                <option value="Seleccione...">
                                    Seleccione...
                                </option>
                                <option value="Villa Carlos Paz">
                                    Villa Carlos Paz
                                </option>
                                <option value="Santa Rosa de Calamuchita">
                                    Santa Rosa de Calamuchita
                                </option>
                                <option value="Villa General Belgrano">
                                    Villa General Belgrano
                                </option>
                                <option value="Cosquín">Cosquín</option>
                                <option value="Mina Clavero">
                                    Mina Clavero
                                </option>
                                <option value="Nono">Nono</option>
                                {/* Agrega más opciones de ciudad según tus necesidades */}
                            </Form.Select>
                            {cityError && (
                                <Form.Control.Feedback type="invalid">
                                    Debes seleccionar una ciudad.
                                </Form.Control.Feedback>
                            )}
                        </FloatingLabel>

                        {/* REFERENCIA */}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Referencias (Opcional)"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Referencias"
                                value={commerceReference}
                                onChange={onCommerceReferenceChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    <button onClick={handleNextStep}>Siguiente</button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default FormularioDireccionComercio;
