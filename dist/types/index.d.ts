export declare class SmartQueue<T> {
    private _items;
    private _listener;
    private _paused;
    constructor(_items?: T[]);
    enqueue(element: T, cb?: (element: T) => void): this;
    dequeue(): this;
    isEmpty(): boolean;
    clear(): this;
    first(): T | null;
    on(listener: (curr_element: T, done: () => void) => void): void;
    private _next;
    pause(): this;
    resume(): this;
    get(): T[] | T;
}
