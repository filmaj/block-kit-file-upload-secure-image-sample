import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import ImageWorkflow from "../workflows/image.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const trigger: Trigger<typeof ImageWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Upload and display an image securely",
  description: "Shows off the File Upload and Secure Image Block Kit elements",
  workflow: `#/workflows/${ImageWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default trigger;
