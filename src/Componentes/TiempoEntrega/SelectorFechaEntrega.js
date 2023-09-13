import React from "react";
import { Form } from "react-bootstrap";

function SelectorFechaEntrega({ value, onChange, error }) {
    
    return (
        <div>
            <Form.Control
                type="datetime-local"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
    );
}

export default SelectorFechaEntrega;
