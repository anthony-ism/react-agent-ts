import dotenv from 'dotenv';
import { HumanMessage } from "@langchain/core/messages";
import { initGraph } from './graph'

dotenv.config();
const initial_state = {
  messages: [new HumanMessage("Hello, how are you, can you add 6 and 5")],
};

async function main() {
    const graph = await initGraph();
    const result = await graph.invoke(initial_state);
    console.log(result.messages[result.messages.length - 1].content);
}

main();

