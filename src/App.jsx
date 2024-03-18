import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Generate initial nodes
const initialNodes = [];
const inputNodes = [];
const outputNodes = [];
// Generate 50 input nodes on the left side
for (let i = 1; i <= 50; i++) {
  const node = {
    id: `input-${i}`,
    data: { label: `Input Node ${i}` },
    position: { x: Math.random() * 300, y: Math.random() * 600 },
    style: { background: 'lightblue', color: 'black' },
  };
  initialNodes.push(node);
  inputNodes.push(node);
}

// Generate 50 output nodes on the right side
for (let i = 1; i <= 50; i++) {
  const node = {
    id: `output-${i}`,
    data: { label: `Output Node ${i}` },
    position: { x: 700 + Math.random() * 300, y: Math.random() * 600 },
    style: { background: 'lightgreen', color: 'black' },
  };
  initialNodes.push(node);
  outputNodes.push(node);
}

const centralNode = {
  id: 'central-node',
  data: { label: 'Central Node' },
  position: { x: 500, y: 300 },
  style: { background: 'gray', color: 'white' },
};
initialNodes.push(centralNode);

const initialEdges = [];
inputNodes.forEach((node) => {
  initialEdges.push({
    id: `edge-${node.id}-central`,
    source: node.id,
    target: 'central-node',
  });
});
outputNodes.forEach((node) => {
  initialEdges.push({
    id: `edge-central-${node.id}`,
    source: 'central-node',
    target: node.id,
  });
});

const nodeTypes = {

};

const App = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = (changes) => {
    const newNodes = applyNodeChanges(changes, nodes);
    setNodes(newNodes);
  };

  const onEdgesChange = (changes) => {
    const newEdges = applyEdgeChanges(changes, edges);
    setEdges(newEdges);
  };

  const [previewNodes, setPreviewNodes] = useState([]);
  const [previewEdges, setPreviewEdges] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const showPreview = (nodeId) => {
    const selected = nodes.find((node) => node.id === nodeId);
    if (selected) {
      setSelectedNode(selected);
      const relatedNodes = [];
      for (let i = 0; i < 10; i++) {
        relatedNodes.push({
          id: `preview-node-${i}`,
          data: { label: `Preview Node ${i}` },
          position: { x: selected.position.x + 100 + i * 50, y: selected.position.y + 100 },
        });
      }
      setPreviewNodes(relatedNodes);
    }
  };


  const hidePreview = () => {
    setSelectedNode(null);
    setPreviewNodes([]);
  };

  const navigateBack = () => {
    const previousState = history.pop();
    if (previousState) {
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistory([...history]);
    }
  };

  return (
    <div className="flex flex-col">
      <nav className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex">
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              LEARN
            </span>
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              WORK
            </span>
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              DISCOVER
            </span>
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              EXPLORE
            </span>
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              ARCHIVE
            </span>
          </div>
          <div className="flex">
            <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              More
            </span>
          </div>
        </div>
      </nav>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto flex items-center">
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
            Explore
          </span>
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
            Node details
          </span>
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
            35009ead-d4a8-4b10-a464-0a0d8307b873 - NODE
          </span>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
            Selected Profile: Materials Cloud three-dimensional crystals
            database (MC3D)
          </span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Discover this data in a curated manner
          </button>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto flex items-center">
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
            DOI 10.24435/materialscloud:rw-t0
          </span>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto flex">
          <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium bg-white">
            Grid
          </span>
          <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
            Details
          </span>
          <span className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
            Statistics
          </span>
        </div>
      </div>
      <div className="container relative mx-auto my-8 flex-grow " style={{ width: '95%', height: '80vh' }}>
       <h2 className=' text-center'> AIIDA PROVENANCE BROWSER </h2>
       <div className="flex absolute left-0 z-10 top-0 justify-between py-4 px-8">
        <button onClick={navigateBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </div>
      <div className="flex absolute right-0 z-10 top-0 justify-between py-4 px-8">
        <button onClick={navigateBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Forward
        </button>
      </div>
      <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            style={{ height: '100%', width: '100%' }}
            onNodeDoubleClick={(event, node) => showPreview(node.id)}
            onBackgroundClick={hidePreview}
          >
            <Background variant="dots" gap={16} />
            <Controls showInteractive={false} />
            <MiniMap nodeColor={(node) => node.style.background} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <div className="grid grid-cols-10  h-96 gap-4 bg-gray-200 p-4" style={{ width: '100%' }}>
        <div className="col-span-5">
          <h2 className="text-lg font-semibold mb-2">Mc3D Chemistry</h2>
          <p className="text-gray-700">Random statistical data related to Mc3D chemistry goes here.(Dummy Data)</p>

        </div>
        <div className="col-span-5 border-l-2 p-2 border-gray-800">
          <h2 className="text-lg font-semibold mb-2">Material Science Info</h2>
          <p className="text-gray-700">Random statistical data related to material science information goes here.(Dummy Data)</p>

        </div>
      </div>
    </div>
  );
};

export default App;