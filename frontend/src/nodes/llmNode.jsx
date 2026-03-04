// llmNode.js

import { BaseNode } from './BaseNode';
import { LuNetwork } from "react-icons/lu";

const config = {
  title: 'LLM',
  icon: <LuNetwork size={18} style={{ color: '#0985DF' }} />,
  handles: [
    { type: 'target', position: 'left', id: 'system' },
    { type: 'target', position: 'left', id: 'prompt' },
    { type: 'source', position: 'right', id: 'response' },
  ],
  fields: [],
};

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} config={config}>
      <span className="base-node-description">This is a LLM.</span>
    </BaseNode>
  );
};
