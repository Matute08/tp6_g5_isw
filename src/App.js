import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ProgressBar from "react-bootstrap/ProgressBar";
import Busqueda from "./Componentes/BusquedaProducto/Busqueda";
import DireccionComercio from "./Componentes/FormularioDireccion/DireccionComercio";
import DireccionEntrega from "./Componentes/FormularioDireccion/DireccionEntrega";

import FormularioPago from "./Componentes/FormularioPago/FormularioPago";
import ResumenPedido from "./Componentes/ResumenPedido/ResumenPedido";
import TiempoEntrega from "./Componentes/TiempoEntrega/TiempoEntrega";
import "./index.css";
import img from "./Imagen/delivereat.png"

function App() {
    const [pasoActual, setPasoActual] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [commerceAddress, setCommerceAddress] = useState("");
    const [commerceHeight, setCommerceHeight] = useState("");
    const [commerceCity, setCommerceCity] = useState("");
    const [commerceReference, setCommerceReference] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryHeight, setDeliveryHeight] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliveryReference, setDeliveryReference] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [total, setTotal] = useState(0);
    const [montoEfectivo, setMontoEfectivo] = useState(0)
    const [selectedImage, setSelectedImage] = useState(null); // Agregado estado para la imagen

    const handleNextStep = () => {
        setPasoActual(pasoActual + 1);
    };

    const handlePrevStep = () => {
        setPasoActual(pasoActual - 1);
    };

    const handleSubmitOrder = () => {
        // Aquí puedes implementar la lógica para enviar el pedido
        console.log("Pedido enviado");
    };
    const handleScheduledTimeChange = (selectedTime) => {
        setScheduledTime(selectedTime);
    };
    

    const renderPasoActual = () => {
        switch (pasoActual) {
            case 1:
                return (
                    <Busqueda
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        onNextStep={handleNextStep}
                        onImageSelected={(image) => setSelectedImage(image)} // Nueva función para guardar la imagen seleccionada
                    />
                );
            case 2:
                return (
                    <DireccionComercio
                        commerceAddress={commerceAddress}
                        commerceHeight={commerceHeight}
                        commerceCity={commerceCity}
                        commerceReference={commerceReference}
                        onCommerceAddressChange={(e) =>
                            setCommerceAddress(e.target.value)
                        }
                        onCommerceHeightChange={(e) =>
                            setCommerceHeight(e.target.value)
                        }
                        onCommerceCityChange={(e) =>
                            setCommerceCity(e.target.value)
                        }
                        onCommerceReferenceChange={(e) =>
                            setCommerceReference(e.target.value)
                        }
                        onPrevStep={handlePrevStep}
                        onNextStep={handleNextStep}
                    />
                );
            case 3:
                return (
                    <DireccionEntrega
                        deliveryAddress={deliveryAddress}
                        deliveryHeight={deliveryHeight}
                        deliveryCity={deliveryCity}
                        deliveryReference={deliveryReference}
                        onCityChange={(e) => setSelectedCity(e.target.value)}
                        onDeliveryAddressChange={(e) =>
                            setDeliveryAddress(e.target.value)
                        }
                        onDeliveryHeightChange={(e) =>
                            setDeliveryHeight(e.target.value)
                        }
                        onDeliveryCityChange={(e) =>
                            setDeliveryCity(e.target.value)
                        }
                        onDeliveryReferenceChange={(e) =>
                            setDeliveryReference(e.target.value)
                        }
                        onPrevStep={handlePrevStep}
                        onNextStep={handleNextStep}
                    />
                );
            case 4:
                return (
                    <ResumenPedido
                        product={searchTerm}
                        commerceAddress={commerceAddress}
                        deliveryAddress={deliveryAddress}
                        commerceHeight={commerceHeight}
                        commerceCity={commerceCity}
                        commerceReference={commerceReference}
                        deliveryHeight={deliveryHeight}
                        deliveryCity={deliveryCity}
                        deliveryReference={deliveryReference}
                        selectedCity={selectedCity}
                        total={total}
                        selectedImage={selectedImage} // Pasar la imagen seleccionada
                        onPrevStep={handlePrevStep}
                        onSubmitOrder={handleSubmitOrder}
                        onNextStep={handleNextStep} // Agregar la función para avanzar al siguiente paso
                    />
                );
            case 5:
                return (
                    <FormularioPago
                        paymentMethod={paymentMethod}
                        cardNumber={cardNumber}
                        cardHolder={cardHolder}
                        montoEfectivo={montoEfectivo}
                        onMontoEfectivoChange ={(value) =>
                        setMontoEfectivo(value)}
                        onPaymentMethodChange={(value) =>
                            setPaymentMethod(value)
                        }
                        onCardNumberChange={(e) =>
                            setCardNumber(e.target.value)
                        }
                        onCardHolderChange={(e) =>
                            setCardHolder(e.target.value)
                        }
                        
                        onPrevStep={handlePrevStep}
                        onNextStep={handleNextStep}
                    />
                );
            case 6:
                return (
                    <TiempoEntrega
                    deliveryTime={deliveryTime}
                    scheduledTime={scheduledTime}
                    onDeliveryTimeChange={(value) => setDeliveryTime(value)}
                    onScheduledTimeChange={handleScheduledTimeChange} // Pasa la función sin invocarla
                    onPrevStep={handlePrevStep}
                    onNextStep={handleNextStep}
                />
                );
            default:
                return null;
        }
    };

    const progreso = ((pasoActual - 1) / 5) * 100;

    return (
        <div>
            <div className="text-center logo">
                <img src={img} alt="" className="" />
            </div>
            
            <div className="fondo">
                <div className="pt-4">
                    <ProgressBar now={progreso} label={`${progreso}%`} />
                </div>
                <div className="titulo mt-3 d-flex justify-content-center">
                    <h1>Realizar Pedido <br /> "Lo que sea"</h1>
                </div>
                <div className="">{renderPasoActual()}</div>
             
            
            </div>

        </div>
    );
}

export default App;
