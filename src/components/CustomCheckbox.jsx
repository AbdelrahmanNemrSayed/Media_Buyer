
export default function CustomCheckbox({ id, checked, onChange, children }) {
    const handleToggle = (e) => {
        e.preventDefault();
        onChange(id, !checked);
    };

    return (
        <div className={`checklist-item ${checked ? 'completed' : ''}`}>
            <div 
                className={`custom-checkbox ${checked ? 'checked' : ''}`}
                onClick={handleToggle}
            />
            <span style={{ cursor: 'pointer' }} onClick={handleToggle}>
                {children}
            </span>
        </div>
    );
}
