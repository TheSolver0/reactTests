/**
 * 
 * @param {string} placeholder 
 * @param {string} value 
 * @param {string} id 
 * @param {(s: string) => void} onChange 
 */

export function Checkbox ({checked, label, id, onChange})
{
    return (
        <div className="form-check">
            <input 
                id={id}
                type="checkbox"
                className="form-check-input"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)} 
            />
            <label htmlFor={id} className="form-check-label">{label}</label>
        </div>
    )
}