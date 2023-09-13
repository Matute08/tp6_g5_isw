import React from "react";
import { Card, Form, Image } from "react-bootstrap";
import imgRandom from "../imagen/imagen.jpg";
import MapaTrayecto from "./MapaTrayecto"; // Importa el componente MapaTrayecto

function ResumenPedido({
    product,
    commerceAddress,
    deliveryAddress,
    commerceHeight,
    commerceCity,
    commerceReference,
    deliveryHeight,
    deliveryCity,
    deliveryReference,
    selectedCity,
    total,
    selectedImage, // Agregado para la imagen seleccionada
    onPrevStep,
    onSubmitOrder,
    onNextStep,
}) {
    return (
        <div className="d-flex justify-content-center m-3">
            <Card className="card-responsive">
                <Card.Header className="text-center">
                    <h2>Resumen del Pedido</h2>
                </Card.Header>

                <Card.Body>
                    <h4>Producto:</h4>
                    <div className="d-flex">
                        <div className="w-100 d-flex align-items-center">
                            <p>Producto: {product}</p>
                        </div>
                        <div className=" d-flex justify-content-end">
                            {selectedImage ? (
                                <Image
                                    className="w-50"
                                    src={selectedImage}
                                    rounded
                                />
                            ) : (
                                // Si selectedImage está vacío, muestra la imagen predeterminada
                                <Image
                                    className="w-50"
                                    src={imgRandom}
                                    rounded
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <h4>Dirección del Comercio:</h4>
                        <p>Dirección: {commerceAddress}</p>
                        <p>Altura: {commerceHeight}</p>
                        <p>Ciudad: {commerceCity}</p>
                        <p>Referencia: {commerceReference}</p>
                    </div>
                    <div>
                        <h4>Dirección de Entrega:</h4>
                        <p>Dirección: {deliveryAddress}</p>
                        <p>Altura: {deliveryHeight}</p>
                        <p>Ciudad: {deliveryCity}</p>
                        <p>Referencia: {deliveryReference}</p>
                    </div>

                    <div>
                        <h4 className="d-flex justify-content-end">
                            Total a Pagar: ${total}
                        </h4>
                    </div>
                    <MapaTrayecto
                        inicio={`${commerceAddress}, ${commerceHeight}, ${commerceCity}`}
                        destino={`${deliveryAddress}, ${deliveryHeight}, ${deliveryCity}`}
                    />
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                    <button onClick={onPrevStep}>Anterior</button>
                    <button onClick={onNextStep}>Siguiente</button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default ResumenPedido;
