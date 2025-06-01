import { QueryRequest, QueryResponse } from '@/api/dto';
import ApiRequest from '@/api/request';

export class ExecuteController {
  constructor(private readonly request: ApiRequest) {}

  public async executeQuery(data: QueryRequest): Promise<QueryResponse> {
    return this.request.post('/execute', data);
  }
}
