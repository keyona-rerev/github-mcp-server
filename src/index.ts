import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express, { Request, Response } from "express";
import { registerRepoTools } from "./tools/repos.js";
import { registerIssueTools } from "./tools/issues.js";
import { registerSearchTools } from "./tools/search.js";

const server = new McpServer({
  name: "github-mcp-server",
  version: "1.0.0",
});

registerRepoTools(server);
registerIssueTools(server);
registerSearchTools(server);

async function runHTTP(): Promise<void> {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", server: "github-mcp-server", version: "1.0.0" });
  });

  app.post("/mcp", async (req: Request, res: Response) => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    res.on("close", () => transport.close());
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  const port = parseInt(process.env.PORT ?? "8080");
  app.listen(port, () => {
    console.error(`GitHub MCP server running on port ${port}`);
  });
}

async function runStdio(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

const transport = process.env.TRANSPORT ?? "http";
if (transport === "http") {
  runHTTP().catch((err: unknown) => {
    console.error("Server error:", err);
    process.exit(1);
  });
} else {
  runStdio().catch((err: unknown) => {
    console.error("Server error:", err);
    process.exit(1);
  });
}
