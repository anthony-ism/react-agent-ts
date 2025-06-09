import middy from '@middy/core';
import httpRouterHandler from '@middy/http-router';
import { initGraph } from './graph';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GraphState } from './graphState';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import validatorMiddleware from '@middy/validator'

let graph: any;
const postHandler =  middy<APIGatewayProxyEvent, APIGatewayProxyResult>()
  .use(validatorMiddleware({eventSchema: {} }))
  .handler(async (req: APIGatewayProxyEvent, context: Context) => {
    if (!graph) {
        graph = await initGraph();
    }
    const userMessage = req.body!;
    const initial_state = new GraphState({ messages: [{ role: "user", content: userMessage }] });
    const result = await graph.invoke(initial_state);

    return { 
        statusCode: 200, 
        body: JSON.stringify(result) 
    };
  });

const routes = [
  { method: 'POST', path: '/user', handler: postHandler }
];

export const handler = middy()
  .use(httpHeaderNormalizer())
   // @ts-ignore
  .use(httpRouterHandler(routes));

