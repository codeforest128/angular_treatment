import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ConsultationModel } from '../classes/consultation_class';

@Injectable()
export class ConsultationsService {
  constructor(
    private readonly http: HttpClient
  ) {}

  getConsultationById(id: string|number): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/consultations/${id}`);
  }

  toggleIsUrgent(id: string|number): Observable<any> {
    return this.http.put(`${environment.apiEndpoint}/consultations/${id}/isUrgent`, {});
  }

  updateConsultation(id: number, consultation: any): Observable<any> {
    return this.http.put(`${environment.apiEndpoint}/consultations/${id}`, consultation);
  }
}
