import React from "react";
import FormularioDireccion from "./FormularioDireccion";

function DireccionComercio({
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
    return (
        <FormularioDireccion
            address={commerceAddress}
            height={commerceHeight}
            city={commerceCity}
            reference={commerceReference}
            onAddressChange={onCommerceAddressChange}
            onHeightChange={onCommerceHeightChange}
            onCityChange={onCommerceCityChange}
            onReferenceChange={onCommerceReferenceChange}
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            tipoDireccion="Comercio"
        />
    );
}

export default DireccionComercio;
