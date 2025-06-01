import { ExecuteController } from '@/api/controller/execute';
import { ProblemController } from '@/api/controller/problem';
import { SchemaController } from '@/api/controller/schema';
import ApiRequest from '@/api/request';

export default class Api {
  private static instance: Api | null = null;

  private readonly request = new ApiRequest();

  private readonly domain = {
    Execute: new ExecuteController(this.request),
    Problem: new ProblemController(this.request),
    Schema: new SchemaController(this.request),
  };

  private constructor() {
    Api.instance = this;
  }

  public static get Domain() {
    return Api.Instance.domain;
  }

  public static get Request(): ApiRequest {
    return Api.Instance.request;
  }

  private static get Instance(): Api {
    if (Api.instance === null) {
      Api.instance = new Api();
    }

    return Api.instance!;
  }
}
