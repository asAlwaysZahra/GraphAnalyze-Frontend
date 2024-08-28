export interface FileData {
  id: string;
  category: string;
  fileName: string;
  uploadDate: string;
}
export interface FileDataResponse {
  items: FileData[];
  totalCount: number;
  pageIndex: number;
}
