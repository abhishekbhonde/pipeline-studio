// mergeNode.js
// A merge node that combines multiple inputs into one output.
// Demonstrates multiple handles on the same side.

import { BaseNode } from './BaseNode';
import { LuWorkflow } from "react-icons/lu";

const config = {
    title: 'Merge',
    icon: <LuWorkflow size={18} style={{ color: '#0985DF' }} />,
    handles: [
        { type: 'target', position: 'left', id: 'input-1' },
        { type: 'target', position: 'left', id: 'input-2' },
        { type: 'target', position: 'left', id: 'input-3' },
        { type: 'source', position: 'right', id: 'merged' },
    ],
    fields: [
        { type: 'select', key: 'strategy', label: 'Strategy', defaultValue: 'Concatenate', options: ['Concatenate', 'First Non-Empty', 'JSON Merge'] },
    ],
};

export const MergeNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
};
