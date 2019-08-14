import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SubheaderService } from '../../../../../core/_base/layout/services/subheader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap, map, finalize, debounce, filter } from 'rxjs/operators';
import { ConsultationsService } from '../../../../../core/services/consultations.service';
import { Observable, timer, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PathologiesComponent } from './pathologies/pathologies.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HeaderService } from '../../../../../core/services/header.service';
import { LoadingOverlayService } from '../../../../../core/services/loading-overlay.service';
import { ConsultationModel, Pathology } from '../../../../../core/classes/consultation_class';
import * as moment from 'moment';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'kt-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.scss'],
  entryComponents: [PathologiesComponent]
})
export class EditConsultationComponent implements OnInit, OnDestroy {
  consultation: ConsultationModel = new ConsultationModel();
  consultation$: Observable<any>;
  consultationId: string;
  rawConsultation: any;

  consultationVer: string = '0';
  
  subs: Subscription[] = [];

  newForm: FormGroup = this.fb.group({
    patient_data: this.fb.group({
      name: ['', [
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      firstname: ['', [
        Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
      ]],
      size: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      weight: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      gender: ['', []],
      pregnant: [false, []],
      IMC: ['', []]
    }),

    intervention: this.fb.group({
      protocol: ['', []],
      details: this.fb.group({
        name: ['', [
          Validators.required,
          Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
        ]],
        date: ['', []],
        type: ['', []],
        surgeon: ['', [
          Validators.pattern(/^(([a-z\-éàè'êëàçù])+\s?)*$/i),
        ]],
        NIR: ['', [
          Validators.pattern(/^\d{13}$/)
        ]],
        emergency: ['', [
          Validators.required
        ]]
      })
    }),

    antecedents: this.fb.group({
      surgery: ['', []],
      complications: ['', []],
      allergies: ['', []],
      pathologies: this.fb.group({
        cardio: ['', []],
        neuro: ['', []],
        digestion: ['', []],
        metabolic: ['', []],
        uro_nephro: ['', []],
        gyneco: ['', []],
        hemato: ['', []],
        dentition: ['', []],
        respiratory: ['', []],
        family: ['', []],
        toxic: ['', []],
        obstetric: ['', []],
        other: ['', []]
      })
    }),

    premedication: ['', []],

    treatment: ['', []],

    clinical_exam: ['', []],

    examination: this.fb.group({
      ECG: ['', []],
      blood: this.fb.group({
        blood_type: ['', []],
        RAI: ['positif', []],
        HB: ['', []],
        TCA: ['', []],
        TP: ['', []],
        Na: ['', []],
        platelet: ['', []],
        K: ['', []],
        creat: ['', []],
      }),
      complementary: ['', []],
    })
  });

  imc$: Observable<number>;

  Editor = ClassicEditor;
  editorConfig = {
    toolbar: ['Bold', 'Italic'],
    alignment: {
      options: ['left', 'right', 'center']
    }
  };

  seriouses$: Observable<[]>;

  get name() { return this.newForm.get('patient_data.name') };
  get pregnant() { return this.newForm.get('patient_data.pregnant') };
  get firstname() { return this.newForm.get('patient_data.firstname') };
  get size() { return this.newForm.get('patient_data.size') };
  get weight() { return this.newForm.get('patient_data.weight') };
  get gender() { return this.newForm.get('patient_data.gender')};
  get interventionName() { return this.newForm.get('intervention.details.name') };
  get interventionDate() { return this.newForm.get('intervention.details.date') };
  get chirurgienName() { return this.newForm.get('intervention.details.surgeon') };
  get nir() { return this.newForm.get('intervention.details.NIR') }
  get isUrgent() { return this.newForm.get('intervention.details.emergency'); }
  get asa() { return this.newForm.get('intervention.protocol.ASA'); }
  get prevention() { return this.newForm.get('intervention.protocol.troboembelic_prevention'); }
  get prevention2() { return this.newForm.get('intervention.protocol.hemoragic_prevention'); }
  get cgr() { return this.newForm.get('intervention.protocol.CGR'); }
  get ciAntalgic() { return this.newForm.get('intervention.protocol.antalgic_CI'); }
  get commentary() { return this.newForm.get('intervention.protocol.comment'); }
  get preSummary() { return this.newForm.get('intervention.protocol.prop_summary'); }
  get postSummary() { return this.newForm.get('intervention.protocol.postop_summary'); }

  // Form groups getters
  get patientDataForm() { return this.newForm['controls'].patient_data; }

  get interventionForm() { return this.newForm['controls'].intervention; }
  get interventionDetailsForm() { return this.interventionForm['controls'].details; }
  get interventionProtocolForm() { return this.interventionForm['controls'].protocol; }

  get antecendentForm() { return this.newForm['controls'].antecedents; }
  get antecedentsPathologiesForm() { return this.antecendentForm['controls'].pathologies; }

  get treatmentForm() { return this.newForm['controls'].treatment; }

  get examinationForm() { return this.newForm['controls'].examination; }
  get examinationBloodForm() { return this.examinationForm['controls'].blood; }

  get clinicExamForm() { return this.newForm['controls'].clinical_exam; }




  constructor(
    private subHeaderService: SubheaderService,
    private activatedRoute: ActivatedRoute,
    private consultationsService: ConsultationsService,
    private fb: FormBuilder,
    private headerService: HeaderService,
    private subheaderService: SubheaderService,
    private loadingOverlay: LoadingOverlayService,
    private router: Router
  ) {
    this.consultation = new ConsultationModel();
    this.subHeaderService.setTitle('Consultation');
    this.subHeaderService.setAction(null);

    // this.seriouses$ = this.form.valueChanges.pipe(
    //   map((values) => {
    //     const allergiesValues = values.allergies.split(';');
    //     this.headerService.setAllergies(allergiesValues);

    //     return values
    //       .antecedents
    //       .split(';')
    //       .concat(allergiesValues)
    //       .concat(values.complications.split(';'))
    //       .concat(values.cardiologic.split(';'))
    //       .concat(values.neurologic.split(';'))
    //       .concat(values.metabolic.split(';'))
    //       .concat(values.digestive.split(';'))
    //       .filter((v) => this.data.seriouses.includes(v));
    //   })
    // );

    this.subs.push(
      this.patientDataForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.interventionForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.interventionDetailsForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.interventionProtocolForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.antecendentForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.antecedentsPathologiesForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.treatmentForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.examinationForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.examinationForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.clinicExamForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation)),
      this.examinationBloodForm.valueChanges.pipe(
        debounce(() => timer(1000))
      ).subscribe(() => this.update(this.rawConsultation))
    );
  }

  ngOnInit() {
    this.subHeaderService.setTitle('consult');
    this.loadingOverlay.setVisible(true);

    this.activatedRoute.params.pipe(
      take(1),
      finalize(() => {
        this.loadingOverlay.setVisible(false);
      })
    ).subscribe((params) => {
      this.consultation$ = this.consultationsService
        .getConsultationById(params.consultationId)
        .pipe(
          tap((consultation) => {

            console.log('Consult', consultation);

            if (consultation.tmp_consultation.version) {
              this.consultationVer = consultation.tmp_consultation.version;
              delete consultation.tmp_consultation.version; 
            }
            this.consultation = deepmerge(new ConsultationModel(), consultation.tmp_consultation, { arrayMerge: (destinationArray, sourceArray, options) => sourceArray });
            this.rawConsultation = consultation;
            Object.setPrototypeOf(this.consultation, ConsultationModel.prototype);
            console.log('new consult', this.consultation);

            this.headerService.setAllergies(this.consultation.antecedents.allergies || []);

            // Charger les données de consultation dans les formgroups

            this.newForm.setValue({
              ...this.newForm.value,
              ...this.consultation
            }, { emitEvent: true, onlySelf: false });


          }),
        );
    });
  }

  obstetricChange(event) {
    this.setFormValue(['antecedents', 'pathologies', 'obstetric'], event.value);
    console.log(event)
    this.weight.setValue(event.weight);

  }

  ngOnDestroy() {
    this.headerService.setSaveAction(null);
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  setFormValue(path: Array<string>, value: Pathology[]) {
    switch (path.length) {
      case 1:
        this.newForm['controls'][path[0]].setValue(value);
        break;
      case 2:
        this.newForm['controls'][path[0]]['controls'][path[1]].setValue(value);
        break;
      case 3:
        this.newForm['controls'][path[0]]['controls'][path[1]]['controls'][path[2]].setValue(value);
        break;
      case 4:
        this.newForm['controls'][path[0]]['controls'][path[1]]['controls'][path[2]]['controls'][path[3]].setValue(value);
        break;
      default:
        return;
    }
    this.headerService.setAllergies(this.newForm['controls'].antecedents['controls'].allergies.value);
  }

  moveTo(path) {
    this.router.navigateByUrl(path);
  }

  validateForms() {
    if (
      this.newForm.valid &&
      this.patientDataForm.valid &&
      this.interventionForm.valid &&
      this.interventionDetailsForm.valid &&
      this.interventionProtocolForm.valid &&
      this.antecendentForm.valid &&
      this.antecedentsPathologiesForm.valid &&
      this.treatmentForm.valid &&
      this.examinationForm.valid &&
      this.examinationBloodForm.valid
    )
      return true;
    else
      console.log('FALSE');
  }

  update(consultation: any) {
    if (!this.validateForms)
      return;
    this.loadingOverlay.setVisible(true);
    let send = this.rawConsultation;
    console.log('SENDING', this.newForm.getRawValue())
    this.rawConsultation.tmp_consultation = this.newForm.getRawValue();
    this.rawConsultation.tmp_consultation['version'] = this.consultationVer;
    this.consultationsService
      .updateConsultation(consultation.id, send)
      .pipe(
        finalize(() => {
          this.loadingOverlay.setVisible(false);
        })
      )
      .subscribe(() => {

      });
  }

  getProp(path, obj, cycle) {
    let newCycle = 1;
    if (path.length > 1) {
      let rec_path = path.shift();
      return this.getProp(path, (cycle === 0 ? this.consultation[rec_path] : obj[rec_path]), newCycle);
    } else {
      return ((cycle === 0 ? this.consultation[path[0]] : obj[path[0]]) || []);
    }
  }

  formateDate(date) {
    moment.locale('fr');
    return moment(date).format('DD/MM/YYYY');
  }

}
