import React, { useState } from "react";
import { Card, FloatingLabel, Form, Col, Row } from "react-bootstrap";
import Mapa from "./Mapa";

function FormularioDireccionEntrega({
    deliveryAddress,
    deliveryHeight,
    deliveryCity,
    deliveryReference,
    onDeliveryAddressChange,
    onDeliveryHeightChange,
    onDeliveryCityChange,
    onDeliveryReferenceChange,
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
        const isAddressValid = isValidAddress(deliveryAddress);
        const isHeightValid = isValidHeight(deliveryHeight);
        const isCityValid = isValidCity(deliveryCity);

        setAddressError(!isAddressValid);
        setHeightError(!isHeightValid);
        setCityError(!isCityValid);

        if (isAddressValid && isHeightValid && isCityValid) {
            onNextStep();
        }
    };

    return (
        <div className="d-flex justify-content-center m-3">
            <Card className="card-responsive">
                <Card.Header className="text-center">
                    <h2>Dirección de Entrega</h2>
                </Card.Header>

                <Card.Body>
                    <Form.Group>
                        <Row>
                            <Col md={8}>
                                {/* DIRECCION DE ENTREGA */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Dirección de Entrega *"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Dirección de Entrega"
                                        value={deliveryAddress}
                                        onChange={onDeliveryAddressChange}
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
                                {/* ALTURA DE ENTREGA */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Altura del Entrega *"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="number"
                                        placeholder="Altura de entrega"
                                        value={deliveryHeight}
                                        onChange={onDeliveryHeightChange}
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
                        {/* CIUDAD DE ENTREGA */}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Ciudad de Entrega *"
                            className="mb-3"
                        >
                            <Form.Select
                                value={deliveryCity}
                                onChange={onDeliveryCityChange}
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
                            label="Referencia (Opcional)"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Referencias"
                                value={deliveryReference}
                                onChange={onDeliveryReferenceChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    {/* Agrega el componente Mapa para la dirección de entrega */}
                    <Mapa
                        tipoDireccion="Entrega"
                        direccion={deliveryAddress}
                        altura={deliveryHeight}
                        ciudad={deliveryCity}
                    />
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    <button onClick={handleNextStep}>Siguiente</button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default FormularioDireccionEntrega;
