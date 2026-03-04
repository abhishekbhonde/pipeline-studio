import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { shallow } from 'zustand/shallow';
import { Modal } from '../ui/Modal';
import { parsePipeline } from '../../utils/api';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const data = await parsePipeline(nodes, edges);
            setResult(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(error.message || 'Error submitting pipeline. Ensure backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="submit-fab-container">
                <button type="button" className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? (
                        <div className="spinner" />
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    Run Pipeline
                </button>
            </div>

            <Modal result={result} onClose={() => setResult(null)} />
        </>
    );
};
