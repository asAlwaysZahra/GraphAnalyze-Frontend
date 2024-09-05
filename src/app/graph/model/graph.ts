export interface AllNodes {
  items: { id: number; entityName: string }[];
  pageIndex: number;
  totalItems: number;
  categoryName: string;
}

export interface Graph {
  nodes: { id: string; label: string }[];
  edges: { from: number; to: number; id: number }[];
}
