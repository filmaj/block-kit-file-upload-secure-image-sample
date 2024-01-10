import { Manifest } from "deno-slack-sdk/mod.ts";
import ImageWorkflow from "./workflows/image.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "BK File Upload Secure Image",
  description: "Show off Block Kit File Upload and Secure Image elements",
  icon: "assets/default_new_app_icon.png",
  workflows: [ImageWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "files:read"],
});
