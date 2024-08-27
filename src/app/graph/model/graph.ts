export interface AllNodes {
  paginateList: string[];
  pageIndex: number;
  totalCount: number;
  typeCategory: string;
}

export interface Graph {
  nodes: [
    {
      id: string;
      lable: string;
    }[]
  ];
  edges: [
    {
      from: string;
      to: string;
      id: string;
    }[]
  ];
}
