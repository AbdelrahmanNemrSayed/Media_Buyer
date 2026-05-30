import { useState, useEffect, useRef, memo } from 'react';

function EditableSlot({ id, placeholder, value, onChange }) {
    const [localValue, setLocalValue] = useState(value || '');
    const debounceTimerRef = useRef(null);

    // Sync from global state if changed from outside (e.g., undo/redo or campaign switch)
    useEffect(() => {
        setLocalValue(value || '');
    }, [value]);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setLocalValue(newVal);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        // Debounce updating global state by 400ms
        debounceTimerRef.current = setTimeout(() => {
            onChange(id, newVal);
        }, 400);
    };

    const handleBlur = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        onChange(id, localValue);
    };

    const isFilled = localValue && localValue.trim() !== '';
    // Auto-adjust width dynamically based on string length to fit smoothly inline
    const textLength = localValue.length || placeholder.length;
    const inputWidth = Math.max(90, textLength * 9 + 20);

    return (
        <input
            type="text"
            className={`editable-slot ${isFilled ? 'has-value' : ''}`}
            style={{ width: `${inputWidth}px` }}
            placeholder={`[${placeholder}]`}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
}

export default memo(EditableSlot);
