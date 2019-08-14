import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientData, InterventionDetails } from '../../../../../../core/classes/consultation_class';
import * as moment from 'moment';

@Component({
  selector: 'kt-sspi-overview',
  templateUrl: './sspi-overview.component.html',
  styleUrls: ['./sspi-overview.component.scss']
})
export class SSPIOverviewComponent implements OnInit {

	@Input() interventionDetails: InterventionDetails = new InterventionDetails;

  	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
	}

	getDate(date) {
		return moment(date).format('DD/MM/YYYY')
	}

}
