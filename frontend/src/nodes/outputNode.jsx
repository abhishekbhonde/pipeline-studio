// outputNode.js

import { BaseNode } from './BaseNode';
import { MdOutput } from "react-icons/md";

const config = {
  title: 'Output',
  icon: <MdOutput size={18} style={{ color: '#0985DF' }} />,
  handles: [
    { type: 'target', position: 'left', id: 'value' },
  ],
  fields: [
    { type: 'text', key: 'outputName', label: 'Name', defaultValue: '' },
    { type: 'select', key: 'outputType', label: 'Type', defaultValue: 'Text', options: ['Text', { value: 'File', label: 'Image' }] },
  ],
};

export const OutputNode = ({ id, data }) => {
  const nodeData = {
    ...data,
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
  };

  return <BaseNode id={id} data={nodeData} config={config} />;
};
