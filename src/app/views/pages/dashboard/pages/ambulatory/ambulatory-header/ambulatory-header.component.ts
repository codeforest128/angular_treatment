import { Component, OnInit, Input } from '@angular/core';
import { PatientData, Pathology } from '../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-ambulatory-header',
  templateUrl: './ambulatory-header.component.html',
  styleUrls: ['./ambulatory-header.component.scss']
})
export class AmbulatoryHeaderComponent implements OnInit {
  @Input() patientData: PatientData = new PatientData();
  @Input() allergies: Array<Pathology> = [];
  @Input() NIR: any = '';

  constructor() { }

  ngOnInit() {
  }

}
