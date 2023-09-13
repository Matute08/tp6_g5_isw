import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import AlertaComponente from "../Alertas/AlertaComponente";
import SelectorEntrega from "./SelectorEntrega";
import SelectorFechaEntrega from "./SelectorFechaEntrega";

function TiempoEntrega({
    deliveryTime,
    scheduledTime,
    onDeliveryTimeChange,
    onScheduledTimeChange,
    onPrevStep,
    onNextStep,
}) {
    const options = [
        { label: "Lo antes posible", value: "asap" },
        { label: "Programar entrega", value: "programar" },
    ];
    const [error, setError] = useState(""); // Estado para almacenar el mensaje de error
    const [isButtonVisible, setIsButtonVisible] = useState(false); // Estado para controlar la visibilidad del botón "Enviar"

    const validarFecha = (selectedTime) => {
        // Obtiene la fecha actual
        const currentDate = new Date();

        // Convierte la fecha seleccionada a un objeto Date
        const selectedDate = new Date(selectedTime);

        // Compara la fecha seleccionada con la fecha actual o igual a la fecha actual
        if (selectedDate < currentDate) {
            setError(
                "La fecha seleccionada no puede ser anterior a la fecha actual."
            );
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
                    <SelectorEntrega
                        selectedValue={deliveryTime}
                        options={options}
                        onChange={onDeliveryTimeChange}
                    />

                    {deliveryTime === "programar" && (
                        <SelectorFechaEntrega
                            value={scheduledTime}
                            onChange={onScheduledTimeChange}
                            error={error}
                        />
                    )}
                    
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    {isButtonVisible && <AlertaComponente />}{" "}
                </Card.Footer>
            </Card>
        </div>
    );
}

export default TiempoEntrega;
