import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../../../../core/services/doctors.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../../core/services/auth.service';
import { LoadingOverlayService } from '../../../../../../core/services/loading-overlay.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'kt-create-consultation-dialog',
  templateUrl: './create-consultation-dialog.component.html',
  styleUrls: ['./create-consultation-dialog.component.scss']
})
export class CreateConsultationDialogComponent implements OnInit {

  minDate: Date = new Date();
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateConsultationDialogComponent>,
    private authService: AuthService,
    private usersService: DoctorsService,
    private fb: FormBuilder,
    private loadingOverlay: LoadingOverlayService
  ) { }

  get patientLastName() { return this.form.get('patientLastName'); }
  get patientFirstName() { return this.form.get('patientFirstName'); }
  get sizeInCm() { return this.form.get('sizeInCm'); }
  get weightInKg() { return this.form.get('weightInKg'); }
  get interventionName() { return this.form.get('interventionName'); }
  get interventionType() { return this.form.get('interventionType'); }
  get chirurgienName() { return this.form.get('chirurgienName'); }
  get interventionDate() { return this.form.get('interventionDate'); }
  get gender() { return this.form.get('gender'); }
  get nir() { return this.form.get('nir'); }

  ngOnInit() {
    this.form = this.fb.group({
      patientLastName: ['', [
        Validators.required,
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      patientFirstName: ['', [
        Validators.required,
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      sizeInCm: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      weightInKg: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      interventionName: ['', [
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      chirurgienName: ['', [
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      interventionType: ['hospitalisation', []],
      interventionDate: ['', []],
      nir: ['', [
        Validators.pattern(/^\d{13}$/)
      ]],
      gender: [
        'male',
        [Validators.required]
      ]
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  createConsultation() {
    if (!this.form.valid) {
      return ;
    }

    this.loadingOverlay.setVisible(true);
    const userId = this.authService.getUser().id;
    this.usersService.createConsultation(userId, this.form.value)
      .pipe(
        finalize(() => {
          this.loadingOverlay.setVisible(false);
        })
      )
      .subscribe((consultation) => {
        this.loadingOverlay.setVisible(false);
        this.dialogRef.close(consultation);
      });
  }

  setForm(key, value) {
    this.form.setValue({ [key]: value });
  }
}
