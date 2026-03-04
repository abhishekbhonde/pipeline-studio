// inputNode.js

import { BaseNode } from './BaseNode';
import { LuImport } from "react-icons/lu";

const config = {
  title: 'Input',
  icon: <LuImport size={18} style={{ color: '#0985DF' }} />,
  handles: [
    { type: 'source', position: 'right', id: 'value' },
  ],
  fields: [
    { type: 'text', key: 'inputName', label: 'Name', defaultValue: '' },
    { type: 'select', key: 'inputType', label: 'Type', defaultValue: 'Text', options: ['Text', 'File'] },
  ],
};

export const InputNode = ({ id, data }) => {
  const nodeData = {
    ...data,
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
  };

  return <BaseNode id={id} data={nodeData} config={config} />;
};
