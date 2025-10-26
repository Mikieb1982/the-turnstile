import { type Flow } from "@modelfusion/flows";
import { 질문 } from "./qa";
import { suggestUI } from "./suggest-ui";
import { generateCode } from "./generate-code";

const flows = [질문, suggestUI, generateCode];

export const dispatcher = new Flow({
  name: "dispatcher",
  input: {
    instruction: "string",
  },
  output: {
    result: "string",
  },
  run: async ({ instruction, ...rest }) => {
    const matchingFlows = [];
    for (const flow of flows) {
      try {
        if (await flow.isMatching({ instruction, ...rest })) {
          matchingFlows.push(flow);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (matchingFlows.length === 1) {
      return matchingFlows[0].run({
        instruction,
        ...rest,
      });
    } else {
      // TODO: Let the user select the flow to run or run QA by default
      return 질문.run({ instruction: instruction, ...rest });
    }
  },
  isMatching: async () => false,
});
