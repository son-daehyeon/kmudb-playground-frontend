import { SchemaResponse } from '@/api/dto';
import ApiRequest from '@/api/request';

export class SchemaController {
  constructor(private readonly request: ApiRequest) {}

  public async getSchema(): Promise<SchemaResponse> {
    return this.request.get('/schema');
  }
}
