/**
 * Write `.z-ai-config` from Vercel env vars so the chatbot works on Vercel.
 *
 * The z-ai-web-dev-sdk requires a `.z-ai-config` JSON file with at minimum:
 *   { "baseUrl": "https://...", "apiKey": "..." }
 *
 * Locally, the SDK finds the file via:
 *   1. process.cwd()/.z-ai-config
 *   2. ~/.z-ai-config
 *   3. /etc/.z-ai-config
 *
 * On Vercel, the filesystem is fresh on every build, so we write the file
 * at build time from these env vars (set in the Vercel dashboard):
 *
 *   ZAI_API_KEY    — required for the chatbot to call the LLM
 *   ZAI_BASE_URL   — defaults to https://internal-api.z.ai/v1
 *   ZAI_CHAT_ID    — optional, x-chat-id header
 *   ZAI_USER_ID    — optional, x-user-id header
 *
 * If ZAI_API_KEY is not set, this script is a no-op (the chatbot will return
 * an error at runtime, but the main portfolio site still deploys & works).
 */
const fs = require("fs");
const path = require("path");

const apiKey = process.env.ZAI_API_KEY;
if (!apiKey) {
  console.log("[write-zai-config] ZAI_API_KEY not set — skipping (chatbot will not work, but portfolio deploys fine).");
  process.exit(0);
}

const config = {
  baseUrl: process.env.ZAI_BASE_URL || "https://internal-api.z.ai/v1",
  apiKey,
  chatId: process.env.ZAI_CHAT_ID || "",
  token: process.env.ZAI_TOKEN || "",
  userId: process.env.ZAI_USER_ID || "",
};

const target = path.join(process.cwd(), ".z-ai-config");
fs.writeFileSync(target, JSON.stringify(config, null, 2));
console.log(`[write-zai-config] Wrote ${target}`);
