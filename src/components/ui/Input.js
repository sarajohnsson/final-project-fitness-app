import { useState } from 'react';

export default function Input({
    placeholder,
    type,
    className,
    value,
    onChangeFunction,
}) {
    const [localValue, setLocalValue] = useState('');

    function changeHandler(e) {
        setLocalValue(e.target.value);
        if (onChangeFunction) {
            onChangeFunction(e.target.value);
        }
    }

    return (
        <div>
            <input
                onChange={changeHandler}
                type={type}
                className={`form-control ${className}`}
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
}
