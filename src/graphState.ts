export class GraphState {
    messages: { role: "user" | "assistant"; content: string; }[] = [];

    constructor(state?: Partial<GraphState>) {
        Object.assign(this, state);
    }

    addMessages(messages: { role: "user" | "assistant"; content: string; }[]) {
        this.messages.push(...messages);
        return this;
    }
}