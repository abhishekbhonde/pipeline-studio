// noteNode.js
// A sticky-note node for annotations — no handles at all.

import { BaseNode } from './BaseNode';
import { LuStickyNote } from "react-icons/lu";

const config = {
    title: 'Note',
    icon: <LuStickyNote size={18} style={{ color: '#0985DF' }} />,
    handles: [],
    fields: [
        { type: 'textarea', key: 'note', label: 'Note', defaultValue: 'Write your note here...', rows: 3 },
    ],
};

export const NoteNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
};
