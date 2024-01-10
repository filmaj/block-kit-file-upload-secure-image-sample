import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ReverseFunctionDefinition } from "../functions/reverse.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const ImageWorkflow = DefineWorkflow({
  callback_id: "image",
  title: "Image Upload and Secure Image block demo",
  description: "Use File Upload and Secure Image block kit elements",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity", "channel"],
  },
});

const formData = ImageWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Upload an image",
  submit_label: "Submit",
  description: "Upload and show an image securely",
  interactivity: ImageWorkflow.inputs.interactivity,
  fields: {
    required: ["image"],
    elements: [
      {
        name: "image",
        title: "Upload an image",
        type: Schema.types.array,
        maxItems: 1,
        items: {
          type: Schema.slack.types.file_id,
          allowed_filetypes_group: "IMAGES_ONLY",
        }
      },
    ],
  },
});

ImageWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ImageWorkflow.inputs.channel,
  message: "Here's your uploaded file!",
  files: formData.outputs.fields.image,
});

export default ImageWorkflow;
