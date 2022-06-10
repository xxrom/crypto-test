import { useMemo } from "react";

type Ref = React.Ref<Node | null>;

/**
 * Используется для записи значения в ref
 *
 * @param ref - React.Ref
 * @param value - Node Element
 */
export const setRef = (ref: Ref, value: Node) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null) {
    (ref as React.MutableRefObject<Node>).current = value;
  }
};

/**
 * Используется для записи нескольких ref
 *
 * @returns memo callback
 * @param refA - React.Ref
 * @param refB - React.Ref
 */
export function useForkRef(refA: Ref, refB: Ref) {
  return useMemo(() => {
    if (!refA && !refB) {
      return null;
    }

    return (refValue: Node | null) => {
      if (refValue) {
        setRef(refA, refValue);
        setRef(refB, refValue);
      }
    };
  }, [refA, refB]);
}
