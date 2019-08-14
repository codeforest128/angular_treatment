import { Component, OnInit, Input } from '@angular/core';
import { PatientData, Pathology } from '../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-monitoring-header',
  templateUrl: './monitoring-header.component.html',
  styleUrls: ['./monitoring-header.component.scss']
})
export class MonitoringHeaderComponent implements OnInit {
  @Input() patientData: PatientData = new PatientData();
  @Input() allergies: Array<Pathology> = [];
  @Input() NIR: any = '';

  constructor() { }

  ngOnInit() {
  }

}
