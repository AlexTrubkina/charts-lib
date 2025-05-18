import { RefObject } from "react";

export const setResolution = (ref: RefObject<HTMLCanvasElement | null>) => {
    if (!ref.current) return;

    const ctx = ref.current.getContext("2d");

    const scale = Math.max(2, window.devicePixelRatio);
    const rect = ref.current.getBoundingClientRect();

    // Set the "actual" size of the canvas
    ref.current.width = rect.width * scale;
    ref.current.height = rect.height * scale;

    // Scale the context to ensure correct drawing operations
    ctx?.scale(scale, scale);

    // Set the "drawn" size of the canvas
    ref.current.style.width = `${rect.width}px`;
    ref.current.style.height = `${rect.height}px`;
}
