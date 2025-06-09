import { CompiledStateGraph } from "@langchain/langgraph";
import { GraphState } from "./graphState";

export const invokeGraphWithUserMessage = async (graph: any, userMessage: string) => {
    const initial_state = new GraphState({ messages: [{ role: "user", content: userMessage }] });
    return graph.invoke(initial_state);
}
