export type PlaceholderGenerator<T extends Node = HTMLElement> = null | (() => T | null);
