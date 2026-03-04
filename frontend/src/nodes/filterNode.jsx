// filterNode.js
// A data filter node with field name, condition dropdown, and value field.

import { BaseNode } from './BaseNode';
import { LuFilter } from "react-icons/lu";

const config = {
    title: 'Filter',
    icon: <LuFilter size={18} style={{ color: '#0985DF' }} />,
    handles: [
        { type: 'target', position: 'left', id: 'data-in' },
        { type: 'source', position: 'right', id: 'data-out' },
    ],
    fields: [
        { type: 'text', key: 'field', label: 'Field', defaultValue: 'name' },
        { type: 'select', key: 'condition', label: 'Condition', defaultValue: 'equals', options: ['equals', 'contains', 'greater than', 'less than', 'not equals'] },
        { type: 'text', key: 'value', label: 'Value', defaultValue: '' },
    ],
};

export const FilterNode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
};
