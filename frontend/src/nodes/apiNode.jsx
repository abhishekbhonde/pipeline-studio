// apiNode.js
// An API request node with method dropdown and URL field.

import { BaseNode } from './BaseNode';
import { TbApiApp } from "react-icons/tb";

const config = {
    title: 'API Request',
    icon: <TbApiApp size={18} style={{ color: '#0985DF' }} />,
    handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'response' },
    ],
    fields: [
        { type: 'select', key: 'method', label: 'Method', defaultValue: 'GET', options: ['GET', 'POST', 'PUT', 'DELETE'] },
        { type: 'text', key: 'url', label: 'URL', defaultValue: 'https://api.example.com' },
    ],
};

export const APINode = ({ id, data }) => {
    return <BaseNode id={id} data={data} config={config} />;
};
