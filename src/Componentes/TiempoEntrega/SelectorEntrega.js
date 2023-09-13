import React from "react";
import { Form } from "react-bootstrap";

function SelectorEntrega({ selectedValue, options, onChange }) {
    return (
        <div>
            {options.map((option) => (
                <Form.Check
                    key={option.value}
                    type="radio"
                    label={option.label}
                    name={option.name}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={() => onChange(option.value)}
                />
            ))}
        </div>
    );
}

export default SelectorEntrega;
