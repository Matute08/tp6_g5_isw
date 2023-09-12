import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import AlertComponent from "./AlertaComponente";

function TiempoEntrega({
    deliveryTime,
    scheduledTime,
    onDeliveryTimeChange,
    onScheduledTimeChange,
    onPrevStep,
    onNextStep,
}) {
    const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
    const [isButtonVisible, setIsButtonVisible] = useState(false); // Estado para controlar la visibilidad del botón "Enviar"

    const validarFecha = (selectedTime) => {
        // Obtiene la fecha actual
        const currentDate = new Date();

        // Convierte la fecha seleccionada a un objeto Date
        const selectedDate = new Date(selectedTime);

        // Compara la fecha seleccionada con la fecha actual o igual a la fecha actual
        if (selectedDate < currentDate) {
            setError("La fecha seleccionada no puede ser anterior a la fecha actual.");
            setIsButtonVisible(false); // Oculta el botón si hay un error
        } else {
            setError(""); // Limpia el mensaje de error si la fecha es válida o igual a la fecha actual
            setIsButtonVisible(true); // Muestra el botón si la fecha es válida
        }
    };

    useEffect(() => {
        // Verificar la validez de la fecha al cargar el componente
        validarFecha(scheduledTime);
    }, [scheduledTime]);

    const handleScheduledTimeChange = (e) => {
        const selectedTime = e.target.value;
        onScheduledTimeChange(selectedTime); // Llama a la función para actualizar scheduledTime
        validarFecha(selectedTime); // Llama a la función de validación
    };

    useEffect(() => {
        // Actualiza la visibilidad del botón "Enviar" cuando cambia la opción de entrega
        setIsButtonVisible(deliveryTime === "asap");
    }, [deliveryTime]);

    return (
        <div className="d-flex justify-content-center m-3">
            <Card className="card-responsive">
                <Card.Header className="text-center">
                    <h2>Tiempo de Entrega</h2>
                </Card.Header>
                <Card.Body>
                    <div>
                        <Form.Check
                            type="radio"
                            label="Lo antes posible"
                            name="deliveryTime"
                            value="asap"
                            checked={deliveryTime === "asap"}
                            onChange={() => onDeliveryTimeChange("asap")}
                        />
                        <Form.Check
                            type="radio"
                            label="Programar entrega"
                            name="deliveryTime"
                            value="programar"
                            checked={deliveryTime === "programar"}
                            onChange={() => onDeliveryTimeChange("programar")}
                        />
                    </div>
                    {deliveryTime === "programar" && (
                        <div>
                            <Form.Control
                                type="datetime-local"
                                value={scheduledTime}
                                onChange={(e) => handleScheduledTimeChange(e)} // Pasa el evento como argumento
                            />
                            {error && <div style={{ color: "red" }}>{error}</div>} {/* Muestra el mensaje de error en rojo si existe */}
                        </div>
                    )}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    {isButtonVisible && <AlertComponent />} {/* Muestra el componente Alert si hay una fecha seleccionada y es válida */}
                </Card.Footer>
            </Card>
        </div>
    );
}

export default TiempoEntrega;
