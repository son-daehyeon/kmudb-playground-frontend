import {
  ProblemDetailResponse,
  ProblemListResponse,
  QueryRequest,
  SubmitResponse,
} from '@/api/dto';
import ApiRequest from '@/api/request';

export class ProblemController {
  constructor(private readonly request: ApiRequest) {}

  public async getProblems(): Promise<ProblemListResponse> {
    return this.request.get('/problems');
  }

  public async getProblem(id: unknown): Promise<ProblemDetailResponse> {
    return this.request.get(`/problems/${id}`);
  }

  public async submit(id: unknown, data: QueryRequest): Promise<SubmitResponse> {
    return this.request.post(`/problems/${id}`, data);
  }
}
