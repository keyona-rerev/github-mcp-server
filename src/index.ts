import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import { registerRepoTools } from "./tools/repos.js";
import { registerIssueTools } from "./tools/issues.js";
import { registerSearchTools } from "./tools/search.js";

const app = express();
app.use(express.json());

const transports = new Map<string, SSEServerTransport>();

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", server: "github-mcp-server", version: "1.0.0" });
});

app.get("/sse", async (_req: Request, res: Response) => {
  const transport = new SSEServerTransport("/messages", res);
  const server = new McpServer({ name: "github-mcp-server", version: "1.0.0" });
  registerRepoTools(server);
  registerIssueTools(server);
  registerSearchTools(server);
  transports.set(transport.sessionId, transport);
  res.on("close", () => transports.delete(transport.sessionId));
  await server.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.get(sessionId);
  if (!transport) {
    res.status(400).json({ error: "No transport found for sessionId" });
    return;
  }
  await transport.handlePostMessage(req, res, req.body);
});

const port = parseInt(process.env.PORT ?? "8080");
app.listen(port, () => {
  console.error(`GitHub MCP server running on port ${port}`);
});
