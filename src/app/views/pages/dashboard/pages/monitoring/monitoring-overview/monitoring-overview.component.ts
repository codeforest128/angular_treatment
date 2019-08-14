import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientData, InterventionDetails } from '../../../../../../core/classes/consultation_class';
import * as moment from 'moment';

@Component({
  selector: 'kt-monitoring-overview',
  templateUrl: './monitoring-overview.component.html',
  styleUrls: ['./monitoring-overview.component.scss']
})
export class MonitoringOverviewComponent implements OnInit {

	@Input() interventionDetails: InterventionDetails = new InterventionDetails;

  	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
	}

	getDate(date) {
		return moment(date).format('DD/MM/YYYY')
	}

}
