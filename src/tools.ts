/**
 * This file defines the tools available to the ReAct agent.
 * Tools are functions that the agent can use to interact with external systems or perform specific tasks.
 */
/**
 * Export an array of all available tools
 * Add new tools to this array to make them available to the agent
 *
 * Note: You can create custom tools by implementing the Tool interface from @langchain/core/tools
 * and add them to this array.
 * See https://js.langchain.com/docs/how_to/custom_tools/#tool-function for more information.
 */

import { MultiServerMCPClient } from "@langchain/mcp-adapters";

// In this project we use MCP tools
export const mcpClient = new MultiServerMCPClient({
        // Global tool configuration options
        // Whether to throw on errors if a tool fails to load (optional, default: true)
        throwOnLoadError: true,
        // Whether to prefix tool names with the server name (optional, default: true)
        prefixToolNameWithServerName: true,
        // Optional additional prefix for tool names (optional, default: "mcp")
        additionalToolNamePrefix: "mcp",
        
        // Use standardized content block format in tool outputs
        useStandardContentBlocks: true,

        // Server configuration
        mcpServers: {
            add: {
            transport: "http",
            url: "https://z5e7xivhz7.execute-api.us-east-1.amazonaws.com/prod/mcp"
        }
    }
});