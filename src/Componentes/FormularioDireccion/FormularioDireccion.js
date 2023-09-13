import React, { useState } from "react";
import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import Mapa from "../Mapa/Mapa"

function FormularioDireccion({
    address,
    height,
    city,
    reference,
    onAddressChange,
    onHeightChange,
    onCityChange,
    onReferenceChange,
    onPrevStep,
    onNextStep,
    tipoDireccion,
}) {
    const [addressError, setAddressError] = useState(false);
    const [heightError, setHeightError] = useState(false);
    const [cityError, setCityError] = useState(false);

    const isValidAddress = (address) => {
        return !!address.trim(); // Esta es una validación de no permitir direcciones vacías
    };

    const isValidHeight = (height) => {
        return !!height.trim() && height >= 0; // Esta es una validación de no permitir alturas vacías
    };

    const isValidCity = (city) => {
        return city !== ""; // Verificar que la ciudad no sea "Seleccione..."
    };

    const handleNextStep = () => {
        const isAddressValid = isValidAddress(address);
        const isHeightValid = isValidHeight(height);
        const isCityValid = isValidCity(city);

        setAddressError(!isAddressValid);
        setHeightError(!isHeightValid);
        setCityError(!isCityValid);

        if (isAddressValid && isHeightValid && isCityValid) {
            onNextStep();
        }
    };

    return (
        <div className="d-flex justify-content-center m-3">
            <Card className=" card-responsive">
                <Card.Header className="text-center">
                    <h2>Dirección de {tipoDireccion}</h2>
                </Card.Header>

                <Card.Body>
                    <Form.Group>
                        <Row>
                            <Col md={8}>
                                {/* DIRECCION */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Calle *"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Calle *"
                                        type="text"
                                        value={address}
                                        onChange={onAddressChange}
                                        isInvalid={addressError}
                                    />
                                    {addressError && (
                                        <Form.Control.Feedback type="invalid">
                                            Debes ingresar una calle.
                                        </Form.Control.Feedback>
                                    )}
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                {/* ALTURA */}
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Número *"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        placeholder="Número *"
                                        type="number"
                                        value={height}
                                        onChange={onHeightChange}
                                        isInvalid={heightError}
                                        min={0}
                                    />
                                    {heightError && (
                                        <Form.Control.Feedback type="invalid">
                                            Debes ingresar una altura válida.
                                        </Form.Control.Feedback>
                                    )}
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* CIUDAD */}
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Ciudad *"
                            className="mb-3"
                        >
                            <Form.Select
                                value={city}
                                onChange={onCityChange}
                                isInvalid={cityError}
                                required
                            >
                                <option value="">Seleccione...</option>
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
                                value={reference}
                                onChange={onReferenceChange}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    {/* Agrega el componente Mapa para la dirección */}
                    <Mapa
                        tipoDireccion={tipoDireccion}
                        direccion={address}
                        altura={height}
                        ciudad={city}
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

export default FormularioDireccion;
