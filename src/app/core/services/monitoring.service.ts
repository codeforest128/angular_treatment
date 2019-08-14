import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/http';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(private readonly http: HttpClient) { }

}
