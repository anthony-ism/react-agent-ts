import dotenv from 'dotenv';
import { HumanMessage } from "@langchain/core/messages";
import { graph } from './graph'

dotenv.config();
const initial_state = {
  messages: [new HumanMessage("Hello, how are you?")],
};

async function main() {
    const result = await graph.invoke(initial_state);
    console.log(result.messages[result.messages.length - 1].content);
}

main();

