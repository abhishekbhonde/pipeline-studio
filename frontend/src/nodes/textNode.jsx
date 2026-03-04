// textNode.js
// A Text node with:
//   1. Auto-resizing textarea (grows with content)
//   2. Dynamic input Handles parsed from {{ variable }} patterns

import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { LuFileText } from "react-icons/lu";

// Regex: matches {{ variableName }} or {{ node.field }}
// Valid JS identifiers, optionally dot-separated.
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = [...text.matchAll(VARIABLE_REGEX)];
  return [...new Set(matches.map((m) => m[1]))];
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState(() => extractVariables(data?.text || '{{input}}'));
  const [nodeWidth, setNodeWidth] = useState(280);
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  // Auto-resize textarea height + compute width
  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    const mirror = mirrorRef.current;
    if (!ta || !mirror) return;

    // Height: reset then set to scrollHeight
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(ta.scrollHeight, 60)}px`;

    // Width: use hidden mirror element
    mirror.textContent = ta.value || ' ';
    const lines = ta.value.split('\n');
    const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
    mirror.textContent = longestLine;
    const measuredWidth = Math.min(Math.max(mirror.scrollWidth + 64, 280), 600);
    setNodeWidth(measuredWidth);
  }, []);

  // Re-parse variables & resize on every text change
  useEffect(() => {
    setVariables(extractVariables(text));
    resizeTextarea();
  }, [text, resizeTextarea]);

  // Initial resize on mount
  useEffect(() => {
    resizeTextarea();
  }, [resizeTextarea]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Position dynamic handles evenly on the left side
  const getHandleTopOffset = (index, total) => {
    // Start handles below the header (~50px), spread evenly
    const headerHeight = 50;
    const bodyStart = headerHeight;
    const available = Math.max(100, total * 40);
    const step = available / (total + 1);
    return bodyStart + step * (index + 1);
  };

  return (
    <div className="base-node text-node" style={{ width: `${nodeWidth}px` }}>
      {/* Hidden mirror for width measurement */}
      <span
        ref={mirrorRef}
        className="text-node-mirror"
        aria-hidden="true"
      />

      {/* Static output handle (right side) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="base-node-handle"
      />

      {/* Dynamic variable handles (left side) */}
      {variables.map((varName, index) => (
        <div key={varName} className="text-node-handle-wrapper" style={{ top: `${getHandleTopOffset(index, variables.length)}px` }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${varName}`}
            className="base-node-handle"
            style={{ top: 0, position: 'absolute' }}
          />
          <span className="text-node-handle-label">{varName}</span>
        </div>
      ))}

      {/* Header */}
      <div className="base-node-header">
        <span className="base-node-icon">
          <LuFileText size={18} style={{ color: '#0985DF' }} />
        </span>
        <span className="base-node-title">Text</span>
      </div>

      {/* Body */}
      <div className="base-node-body">
        <label className="base-node-field">
          <span className="base-node-field-label">Text:</span>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            className="base-node-textarea text-node-textarea"
            placeholder="Type text here... Use {{ variable }} to create inputs"
          />
        </label>

        {/* Show parsed variables as pills */}
        {variables.length > 0 && (
          <div className="text-node-variables">
            {variables.map((v) => (
              <span key={v} className="text-node-variable-pill">{v}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
