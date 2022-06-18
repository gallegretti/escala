import { useState, Dispatch, SetStateAction } from 'react';

export function useAnchorElem(): [HTMLElement | null, Dispatch<SetStateAction<HTMLElement | null>>] {
  const [anchorElement, setAnchorElem] = useState<HTMLElement | null>(null);

  function setAnchorElement(event: any | null) {
    setAnchorElem(event?.currentTarget ?? null);
  }

  return [
    anchorElement,
    setAnchorElement,
  ];
}
