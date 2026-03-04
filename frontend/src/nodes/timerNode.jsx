// timerNode.js
// A delay/timer node with a duration number field and unit dropdown.

import { BaseNode } from './BaseNode';
import { LuClock } from "react-icons/lu";

const config = {
    title: 'Timer',
    icon: <LuClock size={18} style={{ color: '#0985DF' }} />,
    handles: [
        { type: 'target', position: 'left', id: 'trigger' },
        { type: 'source', position: 'right', id: 'done' },
    ],
    fields: [
        { type: 'number', key: 'duration', label: 'Duration', defaultValue: 1000, min: 0, step: 100 },
        { type: 'select', key: 'unit', label: 'Unit', defaultValue: 'ms', options: ['ms', 'sec', 'min'] },
    ],
};

export const TimerNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
};
