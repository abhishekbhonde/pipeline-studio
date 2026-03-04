// BaseNode.js
// Reusable node abstraction for the pipeline builder.
// All nodes share this shell — just pass a config to create a new one.

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

// Maps position strings to React Flow Position enum
const positionMap = {
    left: Position.Left,
    right: Position.Right,
    top: Position.Top,
    bottom: Position.Bottom,
};

// Renders a single form field based on its type
const NodeField = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'text':
            return (
                <label className="base-node-field">
                    <span className="base-node-field-label">{field.label}:</span>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="base-node-input"
                    />
                </label>
            );

        case 'select':
            return (
                <label className="base-node-field">
                    <span className="base-node-field-label">{field.label}:</span>
                    <select
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="base-node-select"
                    >
                        {(field.options || []).map((opt) => {
                            const optValue = typeof opt === 'object' ? opt.value : opt;
                            const optLabel = typeof opt === 'object' ? opt.label : opt;
                            return (
                                <option key={optValue} value={optValue}>
                                    {optLabel}
                                </option>
                            );
                        })}
                    </select>
                </label>
            );

        case 'textarea':
            return (
                <label className="base-node-field">
                    <span className="base-node-field-label">{field.label}:</span>
                    <textarea
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="base-node-textarea"
                        rows={field.rows || 2}
                    />
                </label>
            );

        case 'number':
            return (
                <label className="base-node-field">
                    <span className="base-node-field-label">{field.label}:</span>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="base-node-input"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                    />
                </label>
            );

        default:
            return null;
    }
};

/**
 * BaseNode — the reusable node component.
 *
 * Props:
 *   id       — node id (from React Flow)
 *   data     — node data (from React Flow)
 *   config   — node configuration object:
 *     {
 *       title:   string,           // e.g. "Input"
 *       icon:    string,           // e.g. "📥" (emoji or text)
 *       handles: [                 // connection points
 *         { type: 'source'|'target', position: 'left'|'right'|'top'|'bottom', id: string, style?: object }
 *       ],
 *       fields:  [                 // form fields
 *         { type: 'text'|'select'|'textarea'|'number', key: string, label: string, defaultValue: any, options?: [] }
 *       ],
 *     }
 *   children — optional custom JSX content rendered in the body
 */
export const BaseNode = ({ id, data, config, children }) => {
    const { title, icon, handles = [], fields = [] } = config;

    // Build initial state from fields config + data overrides
    const initialState = {};
    fields.forEach((field) => {
        initialState[field.key] = data?.[field.key] ?? field.defaultValue ?? '';
    });
    const [fieldValues, setFieldValues] = useState(initialState);

    const handleFieldChange = (key, value) => {
        setFieldValues((prev) => ({ ...prev, [key]: value }));
    };

    // Calculate handle positions when there are multiple handles on the same side
    const getHandleStyle = (handle, index, samePositionHandles) => {
        if (samePositionHandles.length <= 1) return handle.style || {};
        const step = 100 / (samePositionHandles.length + 1);
        const offset = step * (samePositionHandles.indexOf(handle) + 1);
        return { top: `${offset}%`, ...handle.style };
    };

    // Group handles by position for spacing calculation
    const handlesByPosition = {};
    handles.forEach((h) => {
        const pos = h.position;
        if (!handlesByPosition[pos]) handlesByPosition[pos] = [];
        handlesByPosition[pos].push(h);
    });

    return (
        <div className="base-node">
            {/* Render handles */}
            {handles.map((handle) => (
                <Handle
                    key={`${id}-${handle.id}`}
                    type={handle.type}
                    position={positionMap[handle.position]}
                    id={`${id}-${handle.id}`}
                    style={getHandleStyle(handle, 0, handlesByPosition[handle.position])}
                    className="base-node-handle"
                />
            ))}

            {/* Header */}
            <div className="base-node-header">
                {icon && <span className="base-node-icon">{icon}</span>}
                <span className="base-node-title">{title}</span>
            </div>

            {/* Body */}
            <div className="base-node-body">
                {fields.map((field) => (
                    <NodeField
                        key={field.key}
                        field={field}
                        value={fieldValues[field.key]}
                        onChange={handleFieldChange}
                    />
                ))}
                {children}
            </div>
        </div>
    );
};
