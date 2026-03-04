import React from 'react';

export const Modal = ({ result, onClose }) => {
    if (!result) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Pipeline Analysis</h3>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="stat-card">
                        <span className="stat-label">Nodes</span>
                        <span className="stat-value">{result.num_nodes}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Edges</span>
                        <span className="stat-value">{result.num_edges}</span>
                    </div>
                    <div
                        className="stat-card"
                        style={{ borderColor: result.is_dag ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}
                    >
                        <span className="stat-label">Is DAG?</span>
                        <span className="stat-value" style={{ color: result.is_dag ? '#10b981' : '#ef4444' }}>
                            {result.is_dag ? 'True ✓' : 'False ✗'}
                        </span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-btn" onClick={onClose}>Dismiss</button>
                </div>
            </div>
        </div>
    );
};
