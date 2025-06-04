export interface QueryRequest {
  query: string;
}

// ################################################################################

export interface ApiResponse<T> {
  error: boolean;
  message: string | null;
  data: T;
}

export interface UserResponse {
  id: number;
  kakao_id: string;
  nickname: string;
  created_at: string;
}

export interface QueryResponse {
  columns: string[];
  result: never[][];
}

export interface ProblemListResponse {
  problems: {
    id: number;
    solved: boolean;
  }[];
}

export interface ProblemDetailResponse {
  id: number;
  description: string;
  solved: boolean;
  query: string;
  example: {
    columns: string[];
    result: never[][];
  };
}

export interface SubmitResponse {
  correct: boolean;
}

export interface SchemaResponse {
  schema: {
    table: {
      column_name: string;
      column_type: string;
      is_nullable: boolean;
    }[];
  };
  relations: {
    table_name: string;
    column_name: string;
    referenced_table_name: string;
    referenced_column_name: string;
  }[];
  primary_keys: {
    [table_name: string]: string[];
  };
}
