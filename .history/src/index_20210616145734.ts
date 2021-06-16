export class SmartQueue<T> {

    private _listener: ((current_element: T, done: () => void) => any) | null = null
    private _paused: boolean = false

    constructor(
        private _items: T[] = []
    ) { }

    enqueue(element: T, cb?: (element: T) => void): this {
        if (this._listener !== null && !this._paused) {
            if (this.isEmpty()) {
                this._items.push(element)
                this._listener(element, () => {
                    if (typeof cb !== 'undefined') cb(element)
                    this._next.bind(this)
                })
            }
        } else {
            this._items.push(element);
        }
        return this
    }

    dequeue(): this {
        if (!this.isEmpty()) this._items.shift();
        return this
    }

    isEmpty(): boolean {
        return this._items.length == 0;
    }

    clear(): this {
        this._items = []
        return this
    }

    first(): T | null {
        if (this.isEmpty()) return null
        return this._items[0];
    }

    on(listener: (curr_element: T, done: () => void) => void) {
        this._listener = listener
    }

    private _next(): void {
        this.dequeue()
        if (!this.isEmpty() && this._listener !== null && !this._paused) this._listener(this.first() as T, this._next.bind(this))
    }

    pause(): this {
        this._paused = true
        return this
    }

    resume(): this {
        this._paused = false
        this._next()
        return this
    }

    get(): T[] | T {
        return this._items
    }


}