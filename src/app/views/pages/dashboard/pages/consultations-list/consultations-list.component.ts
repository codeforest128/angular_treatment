import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SubheaderService } from '../../../../../core/_base/layout/services/subheader.service';
import { Router } from '@angular/router';
import {MatDialog, MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import { CreateConsultationDialogComponent } from './create-consultation-dialog/create-consultation-dialog.component';
import { DoctorsService } from '../../../../../core/services/doctors.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { LoadingOverlayService } from '../../../../../core/services/loading-overlay.service';
import { finalize } from 'rxjs/operators';
import { ConsultationModel } from '../../../../../core/classes/consultation_class';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';

export interface ConsultationElement {
	id: number;
	patientFullName: string;
	interventionName: string;
	chirurgienName: string;
	interventionDate: string;
	createdAt: string;
}

// Custom filter
let filterFunction = function(data, filter): boolean {
	let searchTerms = JSON.parse(filter);
	let interventionDate = searchTerms.interventionDate.toString().toLowerCase();

	moment.locale('fr');
	let consultationDate = moment(searchTerms.createdAt).format('DD/MM/YYYY');
	let createdAt = moment(data.createdAt).format('DD/MM/YYYY');

	return (
		data.patientFullName.toString().toLowerCase().indexOf(searchTerms.patientFullName) !== -1
		&& data.interventionDate.toString().toLowerCase().indexOf(interventionDate) !== -1
		&& data.interventionName.toString().toLowerCase().indexOf(searchTerms.interventionName) !== -1
		&& data.chirurgienName.toString().toLowerCase().indexOf(searchTerms.chirurgienName) !== -1
		&& createdAt.indexOf(consultationDate) !== -1
	);
};

@Component({
  selector: 'kt-consultations-list',
  templateUrl: './consultations-list.component.html',
  styleUrls: ['./consultations-list.component.scss'],
  entryComponents: [CreateConsultationDialogComponent],
})

export class ConsultationsListComponent implements OnInit {

  @ViewChild('table', { static: false }) table: MatTable<any>;
  dataSource: MatTableDataSource<ConsultationElement> = new MatTableDataSource<ConsultationElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = [
    'id',
    'patientFullName',
    'interventionName',
    'chirurgienName',
    'interventionDate',
    'createdAt',
    'actions'
  ];

  // Filter
	filterValues = {
		id: '',
		patientFullName: '',
		interventionName: '',
		chirurgienName: '',
		interventionDate: '',
		createdAt: '',
	};

	// Form control filter name
	nameFilter = new FormControl('');
	interventionDateFilter = new FormControl('');
	interventionNameFilter = new FormControl('');
	surgeonNameFilter = new FormControl('');
	consultationDateFilter = new FormControl('');

  constructor(
    private subHeaderService: SubheaderService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private doctorsService: DoctorsService,
    private loadingOverlayService: LoadingOverlayService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subHeaderService.setTitle('Consultations en attente');
    this.subHeaderService.setAction(this.createConsultation.bind(this));
    const userId = this.authService.getUser().id;
    this.loadingOverlayService.setVisible(true);
    this.doctorsService.getConsultations(userId)
    .pipe(
      finalize(() => {
        this.loadingOverlayService.setVisible(false);
      })
    )
    .subscribe((consultations: any[]) => {
      this.formateDataSource(consultations);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = filterFunction;
	});

    // Filters
	  this.nameFilter.valueChanges
		  .subscribe(
			  name => {
				  this.filterValues.patientFullName = name.toString().toLowerCase();
				  this.dataSource.filter = JSON.stringify(this.filterValues);
			  }
		  );
	  this.interventionNameFilter.valueChanges
		  .subscribe(
			  name => {
				  this.filterValues.interventionName = name.toString().toLowerCase();
				  this.dataSource.filter = JSON.stringify(this.filterValues);
			  }
		  );
	  this.surgeonNameFilter.valueChanges
		  .subscribe(
			  name => {
				  this.filterValues.chirurgienName = name.toString().toLowerCase();
				  this.dataSource.filter = JSON.stringify(this.filterValues);
			  }
		  );
	  this.interventionDateFilter.valueChanges
		  .subscribe(
			  date => {
			  	if (date === null) {
			  		date = '';
				}
				  this.filterValues.interventionDate = date;
				  this.dataSource.filter = JSON.stringify(this.filterValues);
			  }
		  );
	  this.consultationDateFilter.valueChanges
		  .subscribe(
			  date => {
				  if (date === null) {
					  date = '';
				  }
				  this.filterValues.createdAt = date;
				  this.dataSource.filter = JSON.stringify(this.filterValues);
			  }
		  );
  }

  formateDataSource(consultations) {
  	let _this = this;
    (consultations.map(function(consultation) {
      let tmp_consultation: ConsultationModel = consultation.tmp_consultation;
      Object.setPrototypeOf(tmp_consultation, ConsultationModel.prototype);

      let out: ConsultationElement = {
		  id: consultation.id,
		  patientFullName: tmp_consultation.patientFullName,
		  interventionName:
			  (tmp_consultation && tmp_consultation.intervention && tmp_consultation.intervention.details && tmp_consultation.intervention.details.name) ? tmp_consultation.intervention.details.name : '',
		  chirurgienName:
			  (tmp_consultation && tmp_consultation.intervention && tmp_consultation.intervention.details && tmp_consultation.intervention.details.surgeon) ? tmp_consultation.intervention.details.surgeon : '',
		  interventionDate:
			  (tmp_consultation && tmp_consultation.intervention && tmp_consultation.intervention.details && tmp_consultation.intervention.details.date) ? tmp_consultation.intervention.details.date : '',
		  createdAt: consultation.created_at
	  };
      _this.dataSource.data.unshift(out);
    }));
  }

    jsUcfirst(string) {
        if (!string) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    moveTo(path) {
      this.router.navigate(['/dashboard']);
    }

  createConsultation() {
    const dialogRef = this.dialog.open(CreateConsultationDialogComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((consultation) => {
      if (consultation) {
        this.dataSource.data.unshift(consultation);
        this.table.renderRows();
        this.goToConsultation(consultation);
      }
    });
  }

  goToConsultation(consultation: any) {
    this.router.navigateByUrl(`/dashboard/consultation/${consultation.id}`);
  }

  formateDate(date) {
    moment.locale('fr');
    return moment(date).format('DD/MM/YYYY');
  }
}
