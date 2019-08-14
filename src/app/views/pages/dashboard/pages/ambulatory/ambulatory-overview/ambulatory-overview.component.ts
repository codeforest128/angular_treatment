import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PatientData, InterventionDetails } from '../../../../../../core/classes/consultation_class';
import * as moment from 'moment';

@Component({
  selector: 'kt-ambulatory-overview',
  templateUrl: './ambulatory-overview.component.html',
  styleUrls: ['./ambulatory-overview.component.scss']
})
export class AmbulatoryOverviewComponent implements OnInit {

	@Input() interventionDetails: InterventionDetails = new InterventionDetails;

  	constructor(private formBuilder: FormBuilder) { }

	ngOnInit() {
	}

	getDate(date) {
		return moment(date).format('DD/MM/YYYY')
	}

}
