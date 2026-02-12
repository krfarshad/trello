export type MetaResponse = {
  current_page: number;
  last_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
};

export type ApiResponse<T> = {
  data: T;
  errors?: { key: string; value: [] }[];
  message: string;
  success: true | false;
};
export type ApiPaginateResponse<T> = {
  data: T;
  message: string;
  success: true | false;
  errors?: { key: string; value: [] }[];
  meta: MetaResponse;
};

export type PassportTokenResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type QueryParams = { [key: string]: any };

export type FilterInstance = {
  per_page?: number;
  page?: number;
};
// export type QueryParams = {
//   page?: number;
//   per_page?: string;
//   filters?: { [key: string]: string | string[] };
//   sort?: string;
//   params?: { [key: string]: string | object };
// };
