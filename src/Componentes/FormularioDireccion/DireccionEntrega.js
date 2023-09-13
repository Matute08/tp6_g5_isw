import React from "react";
import FormularioDireccion from "./FormularioDireccion";

function DireccionEntrega({
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
    return (
        <FormularioDireccion
            address={deliveryAddress}
            height={deliveryHeight}
            city={deliveryCity}
            reference={deliveryReference}
            onAddressChange={onDeliveryAddressChange}
            onHeightChange={onDeliveryHeightChange}
            onCityChange={onDeliveryCityChange}
            onReferenceChange={onDeliveryReferenceChange}
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            tipoDireccion="Entrega"
        />
    );
}

export default DireccionEntrega;
