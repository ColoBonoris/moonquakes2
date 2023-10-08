import { writable, get } from 'svelte/store';

export const canvasContainer = writable<HTMLElement>();

export function width(): number {
    const container = get(canvasContainer);
    if (!container) {
        return window.innerWidth
    }
    const width = container.getBoundingClientRect().width;
    console.log('width', width);
    return width;
}

export function height(): number {
    const container = get(canvasContainer);
    if (!container) {
        return window.innerHeight
    }
    const height = container.getBoundingClientRect().height;
    console.log('height', height);
    return height;
}