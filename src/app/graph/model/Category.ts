export interface CategoryData {
  id: number;
  name: string;
  count: number;
}

export interface GetCategoriesResponse {
  paginateList: CategoryData[];
  pageIndex: number;
  totalCount: number;
}
