import json
from fastapi import APIRouter, Form, HTTPException
from services.dag_service import calculate_dag

router = APIRouter()

@router.post('/parse')
def parse_pipeline(pipeline: str = Form(...)):
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        is_dag = calculate_dag(nodes, edges)
            
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON pipeline data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
