/**
 * 
 * @param {string} label 
 * @param {string} value 
 * @param {string} id 
 * @param {int} min 
 * @param {int} max 
 * @param {(s: string) => void} onChange 
 */

export function Range ({min, max, id, value, label, onChange})
{
    return (
        <div>
            <input 
                id={id}
                type="range"
                min={min}
                max={max}
                className="form-control"
                value={value}
                onChange={(e) => onChange(e.target.value)} 
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}