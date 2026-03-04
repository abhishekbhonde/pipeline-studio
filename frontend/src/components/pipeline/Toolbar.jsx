import React from 'react';
import { DraggableNode } from './DraggableNode';
import {
    LuImport, LuNetwork, LuFileText, LuStickyNote,
    LuClock, LuFilter, LuWorkflow
} from "react-icons/lu";
import { TbApiApp } from "react-icons/tb";
import { MdOutput } from "react-icons/md";

export const PipelineToolbar = () => {
    return (
        <div className="pipeline-navbar">
            <div className="pipeline-logo">
                <div className="pipeline-logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12C4 12 7 4 12 4C17 4 20 12 20 12C20 12 17 20 12 20C7 20 4 12 4 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12H4M20 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                Pipeline Studio
            </div>

            <div className="toolbar-nodes-container">
                <DraggableNode type='customInput' label='Input' icon={<LuImport size={16} />} />
                <DraggableNode type='llm' label='LLM' icon={<LuNetwork size={16} />} />
                <DraggableNode type='customOutput' label='Output' icon={<MdOutput size={16} />} />
                <DraggableNode type='text' label='Text' icon={<LuFileText size={16} />} />
                <DraggableNode type='note' label='Note' icon={<LuStickyNote size={16} />} />
                <DraggableNode type='api' label='API' icon={<TbApiApp size={16} />} />
                <DraggableNode type='timer' label='Timer' icon={<LuClock size={16} />} />
                <DraggableNode type='filter' label='Filter' icon={<LuFilter size={16} />} />
                <DraggableNode type='merge' label='Merge' icon={<LuWorkflow size={16} />} />
            </div>
        </div>
    );
};
