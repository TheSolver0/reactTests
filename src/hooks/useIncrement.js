import { useCallback, useState } from "react";

/**
 * 
 * @param {int} initialValue 
 * @returns 
 */

export function useIncrement (initialValue)
{
    const [state, setState] = useState(initialValue)
    return {
        v: state,
        incr: useCallback(() => setState(v => v + 1),[initialValue]),
        decr: useCallback(() => setState(v => v - 1),[initialValue])
    }
}