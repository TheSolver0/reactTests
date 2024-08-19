import {describe, it, expect} from "vitest";
import {useIncrement} from "../src/hooks/useIncrement";
import {renderHook} from "@testing-library/react";

describe('useIncrement', () => {
    it('should use the default value', () => {
      const {result} = renderHook(() => useIncrement({initialValue:5}))
      expect(result.current.v).toBe(5)
    })
})