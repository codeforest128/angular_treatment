import { Component, OnInit, Input } from '@angular/core';
import { PatientData, Pathology } from '../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-sspi-header',
  templateUrl: './sspi-header.component.html',
  styleUrls: ['./sspi-header.component.scss']
})
export class SSPIHeaderComponent implements OnInit {
  @Input() patientData: PatientData = new PatientData();
  @Input() allergies: Array<Pathology> = [];
  @Input() NIR: any = '';

  constructor() { }

  ngOnInit() {
  }

}
