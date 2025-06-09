import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { initGraph } from './graph';

dotenv.config();
class GraphState {
    messages: { role: "user" | "assistant"; content: string; }[] = [];

    constructor(state?: Partial<GraphState>) {
        Object.assign(this, state);
    }

    addMessages(messages: { role: "user" | "assistant"; content: string; }[]) {
        this.messages.push(...messages);
        return this;
    }
}

const app = express();
const port = process.env.PORT || 6300;

app.use(express.json());

app.post("/chat", async (req, res) => {
 
    const graph = await initGraph();

    const userMessage = req.body.message;

    const initial_state = new GraphState({ messages: [{ role: "user", content: userMessage }] });

    const result = await graph.invoke(initial_state);

    res.json({ response: result.messages.filter((m) => m.additional_kwargs.role === 'assistant').map(m => m.content).join('\n') });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });