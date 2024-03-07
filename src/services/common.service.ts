/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {}

  getAllPlanets(url: string = `${environment.apiUrl}planets/?format=json`): any {
    return this.http.get(url);
  }

  getPlanetDetails(id: number): any {
    return this.http.get(`${environment.apiUrl}planets/${id}/`);
  }

  getResidentDetails(url: string): any {
    return this.http.get(url);
  }
}
