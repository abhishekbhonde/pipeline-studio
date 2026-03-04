import { PipelineToolbar } from './components/pipeline/Toolbar';
import { PipelineCanvas } from './components/pipeline/PipelineCanvas';
import { SubmitButton } from './components/pipeline/SubmitButton';

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <PipelineToolbar />
            <div style={{ flex: 1, position: 'relative' }}>
                <PipelineCanvas />
                <SubmitButton />
            </div>
        </div>
    );
}

export default App;
