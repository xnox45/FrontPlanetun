import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Result } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public ProcessarDados(numbers: number[]): Observable<Result<string[]>> {
    const url = `${this.getApiUrl()}/Planetun/processar-async`;

    return this.http.post(url, numbers).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
