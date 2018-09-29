/**
 * This is a number, a **foo** number !
 */
declare var foo:number;

/**
 * The widget rendering Context
 */
interface RenderContext {
    environment: string;
}
declare function renderFunction(ctx: RenderContext): void;
/**
 * A Widget dedicated to be displayed in the main dashboard view
 */
declare interface Widget {
    /**
     * The name of the widget
     */
    name: string;
    /**
     * This unique widget identifier. This value if not provided is
     * internally set by the dashboard. Call : `createId` to get one
     */
    id: number;
    /**
     * A code that has no other usage then messing thing up
     */
    color?: string;
    /**
     * Render the widget 
     */
    renderToDashboard: renderFunction;
}
declare function getWidget(n: number): Widget;

declare class Greeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(s:string): void;
}

declare function printLabel(labelledObj: { label: string }): void;
/**
 * Readonly Point
 */
interface Point {
    readonly x: number;
    readonly y: number;
}
