import React, { useState } from "react";
import { Card, FloatingLabel, Form, Col, Row } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Swal from "sweetalert2";

function FormularioPago({
    paymentMethod,
    cardNumber,
    cardHolder,
    onPaymentMethodChange,
    onCardNumberChange,
    onCardHolderChange,
    montoEfectivo,
    onMontoEfectivoChange,
    onPrevStep,
    onNextStep,
}) {
    const [cardDetails, setCardDetails] = useState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
    });

    const [cashAmountError, setCashAmountError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardHolderError, setCardHolderError] = useState(false);
    const [expiryError, setExpiryError] = useState(false);
    const [cvcError, setCvcError] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState("");

    const isVisaOrMasterCard = (cardNumber) => {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const masterCardRegex = /^5[1-5][0-9]{14}$/;

        return visaRegex.test(cardNumber) || masterCardRegex.test(cardNumber);
    };

    const handleCardInputChange = (evt) => {
        const { name, value } = evt.target;

        if (name === "number" && value.length > 16) {
            return;
        }

        if (name === "expiry") {
            const mesActual = new Date().getMonth()+1;
            const añoActual = new Date().getFullYear()
            

            const mesSeleccionado = value.slice(0,2)
            const añoSeleccionado =  parseInt(value.slice(3))

            if (mesSeleccionado >= '01' && mesSeleccionado <='12'   ) {

                if (añoSeleccionado > añoActual) {
                    setCardDetails((prev) => ({ ...prev, [name]: value }));
                    setExpiryError(false)

                    
                }else if (añoSeleccionado === añoActual && mesSeleccionado> mesActual) {
                    setCardDetails((prev) => ({ ...prev, [name]: value }));
                    setExpiryError(false)
                    
                }else{
                    setExpiryError(true)
                }
            }else{
                setExpiryError(true)
            }
            
        } else if (name === "cvc" && value.length > 3) {
            return;
        } else {
            setCardDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleCardInputFocus = (evt) => {
        setCardDetails((prev) => ({ ...prev, focus: evt.target.name }));
    };

    const handleCashAmountChange = (evt) => {
        const cashAmount = evt.target.value;
        setCashAmountError(!cashAmount.trim());
    };

    const handleNextStep = () => {
        
        let isValid = true;

        if (paymentMethod === "efectivo") {
            const cashAmount = document.getElementById("cashAmount").value;
            console.log(!cashAmount.trim());
            setCashAmountError(!cashAmount.trim());
            if (!cashAmount.trim() || cashAmount < 0) {
               
                setCashAmountError(true);
                isValid = false;
            }
            else{
                onNextStep();
            }
        

        } else if (paymentMethod === "card") {
            const isCardNumberValid = !!cardDetails.number.trim();
            const isCardHolderValid = !!cardDetails.name.trim();
            const isExpiryValid = /^\d{1,2}\s*\/\s*\d{4}$/.test(
                cardDetails.expiry
            );
            const isCvcValid = /^\d{1,3}$/.test(cardDetails.cvc);

            if (cardDetails.number < 0 || cardDetails.number.length < 16) {
                setCardNumberError(true);
            } else {
                if (cardDetails.cvc < 0 || cardDetails.cvc.length < 3) {
                    setCvcError(true);
                } else {
                    setCardNumberError(!isCardNumberValid);
                    setCardHolderError(!isCardHolderValid);
                    setExpiryError(!isExpiryValid);
                    setCvcError(!isCvcValid);

                    if (
                        !isCardNumberValid ||
                        !isCardHolderValid ||
                        !isExpiryValid ||
                        !isCvcValid
                    ) {
                        isValid = false;
                    }

                    if (isValid) {
                        // Realizar la validación de Visa o MasterCard solo si todas las demás validaciones son exitosas
                        if (
                            paymentMethod === "card" &&
                            !isVisaOrMasterCard(cardDetails.number)
                        ) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Solo se permiten tarjetas Visa o MasterCard.",
                            });
                            return;
                        }

                        onNextStep();
                    }
                }
            }
            
        }
    };

    return (
        <div className="d-flex justify-content-center m-3">
            <Card className="card-responsive">
                <Card.Header className="text-center">
                    <h2>Forma de Pago</h2>
                </Card.Header>

                <Card.Body>
                    <div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Forma de pago *"
                            className="mb-3"
                        >
                            <Form.Select
                                id="paymentMethod"
                                label="Método de Pago"
                                value={paymentMethod}
                                onChange={(e) => {
                                    onPaymentMethodChange(e.target.value);
                                    setIsOptionSelected(e.target.value !== "");
                                }}
                            >
                                <option value="">Seleccione...</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="card">
                                    Tarjeta de Débito/Crédito
                                </option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>

                    {paymentMethod === "card" && (
                        <div className="m-2 credit-card-conteiner">
                            <Row>
                                <Col md={12}>
                                    <FloatingLabel
                                        controlId="floatingInputCardNumber"
                                        label="Número de tarjeta"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="number"
                                            name="number"
                                            placeholder="Número de tarjeta"
                                            value={cardDetails.number}
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            isInvalid={cardNumberError}
                                            min={0}
                                        />
                                        {cardNumberError && (
                                            <Form.Control.Feedback type="invalid">
                                                Debes ingresar un número de
                                                tarjeta.
                                            </Form.Control.Feedback>
                                        )}
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel
                                        controlId="floatingInputCardHolder"
                                        label="Nombre y Apellido del titular"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Nombre y Apellido del titular"
                                            value={cardDetails.name}
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            isInvalid={cardHolderError}
                                        />
                                        {cardHolderError && (
                                            <Form.Control.Feedback type="invalid">
                                                Debes ingresar nombre y apellido
                                                del titular.
                                            </Form.Control.Feedback>
                                        )}
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel
                                        controlId="floatingInputCardExpiry"
                                        label="Fecha de vencimiento (MM/YYYY)"
                                        className="mb-3  flex-grow-1"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="expiry"
                                            maxLength="7"
                                            placeholder="MM/YYYY"
                                            onKeyDown={(e) => {
                                                e.target.value = e.target.value
                                                    .replace(
                                                        /^(\d{2})(\d{0,4})$/g,
                                                        (_, p1, p2) =>
                                                            p1 +
                                                            (p2 ? "/" + p2 : "")
                                                    )
                                                    .replace(/[^\d\/]/g, "");
                                            }}
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            isInvalid={expiryError}
                                        />

                                        {expiryError && (
                                            <Form.Control.Feedback type="invalid">
                                                Debes ingresar una fecha de
                                                vencimiento válida.
                                            </Form.Control.Feedback>
                                        )}
                                    </FloatingLabel>
                                </Col>

                                <Col md={12}>
                                    <FloatingLabel
                                        controlId="floatingInputCardCvc"
                                        label="CVC"
                                        className="mb-3 flex-grow-1"
                                    >
                                        <Form.Control
                                            type="number"
                                            name="cvc"
                                            placeholder="CVC"
                                            value={cardDetails.cvc}
                                            onChange={handleCardInputChange}
                                            onFocus={handleCardInputFocus}
                                            isInvalid={cvcError}
                                            min={0}
                                        />
                                        {cvcError && (
                                            <Form.Control.Feedback type="invalid">
                                                Debes ingresar un CVC.
                                            </Form.Control.Feedback>
                                        )}
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Cards
                                number={cardDetails.number}
                                expiry={cardDetails.expiry}
                                cvc={cardDetails.cvc}
                                name={cardDetails.name}
                                focused={cardDetails.focus}
                            />
                        </div>
                    )}

                    {paymentMethod === "efectivo" && (
                        <div className="m-3">
                            <FloatingLabel
                                
                                label="Ingrese el monto en efectivo"
                                className="mb-3"
                            >
                                <Form.Control
                                    id="cashAmount"
                                    type="number"
                                    placeholder="Ingrese el monto en efectivo"
                                    value={montoEfectivo}
                                    onChange={(e) => {
                                        onMontoEfectivoChange(e.target.value);
                                       
                                    }}
                                    onBlur={handleCashAmountChange}
                                    isInvalid={cashAmountError}
                                    min={0}
                                />
                                {cashAmountError && (
                                    <Form.Control.Feedback type="invalid">
                                        Ingresa correctamente el monto en
                                        efectivo a pagar.
                                    </Form.Control.Feedback>
                                )}
                            </FloatingLabel>
                        </div>
                    )}
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    
                        <button onClick={handleNextStep}>Siguiente</button>
                    
                </Card.Footer>
            </Card>
        </div>
    );
}

export default FormularioPago;
