from typing import List, Dict, Any
from collections import defaultdict, deque

def calculate_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Determines if a given set of nodes and edges forms a Directed Acyclic Graph (DAG)
    using Kahn's Algorithm (Topological Sort).
    """
    num_nodes = len(nodes)
    
    adjacency_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes to 0
    for node in nodes:
        in_degree[node['id']] = 0
        
    # Build the graph
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        adjacency_list[source].append(target)
        in_degree[target] += 1
        
    # Add all nodes with 0 in-degree to the queue
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    visited_count = 0
    
    while queue:
        current = queue.popleft()
        visited_count += 1
        
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    # If we didn't visit all nodes, there is a cycle
    return visited_count == num_nodes or num_nodes == 0
