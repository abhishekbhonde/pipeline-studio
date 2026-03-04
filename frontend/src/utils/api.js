/**
 * api.js
 * Centralized utility for handling backend communication.
 */

// Use an environment variable for the backend URL if available, otherwise fallback to local dev
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://pipeline-studio-mzyy.onrender.com';

export const parsePipeline = async (nodes, edges) => {
    const formData = new FormData();
    formData.append('pipeline', JSON.stringify({ nodes, edges }));

    const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to parse pipeline. Backend returned an error.');
    }

    return await response.json();
};
