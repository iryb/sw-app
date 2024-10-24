import { addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback } from "react";

const initialEdges = [{ id: "e1-1", source: "0", target: "0" }];

type Node = {
  id: string;
  position: { x: number; y: number };
  data: { label: JSX.Element };
};

type reactFlowProps = {
  initialNodes: Node[];
};

export const useReactFlow = ({ initialNodes }: reactFlowProps) => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const addNode = useCallback(
    (id: string, position: any, data: any) => {
      setNodes((nds) => [
        ...nds,
        {
          id,
          position,
          data,
        },
      ]);
    },
    [setNodes]
  );

  const addNewEdge = useCallback(
    (id: string, source: string, target: string) => {
      setEdges((eds) => addEdge({ id, source, target }, eds));
    },
    [setEdges]
  );

  return {
    nodes,
    edges,
    addNode,
    addNewEdge,
  };
};
