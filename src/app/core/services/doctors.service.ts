import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { ConsultationModel } from '../../core/classes/consultation_class';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) { }

  createConsultation(userId: number, consultation: any) {
    const path = `${environment.apiEndpoint}/doctors/${userId}/consultations`;
    let newConsult = new ConsultationModel();

    newConsult.patient_data.firstname = consultation.patientFirstName;
    newConsult.patient_data.name = consultation.patientLastName;
    newConsult.patient_data.gender = consultation.gender;
    newConsult.patient_data.weight = consultation.weightInKg;
    newConsult.patient_data.size = consultation.sizeInCm;
    newConsult.patient_data.IMC = parseFloat((newConsult.patient_data.weight / (newConsult.patient_data.size / 100 * newConsult.patient_data.size / 100)).toFixed(1));

    newConsult.intervention.details.NIR = consultation.nir;
    newConsult.intervention.details.name = consultation.interventionName;
    newConsult.intervention.details.date = consultation.interventionDate;
    newConsult.intervention.details.surgeon = consultation.chirurgienName;
    newConsult.intervention.details.type = consultation.interventionType;

    return this.http.post(path, newConsult.consultation);
  }

  getConsultations(userId: number) {
    const path = `${environment.apiEndpoint}/doctors/${userId}/consultations`;
    return this.http.get(path);
  }
}
