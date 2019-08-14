import { MatButtonModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule,		MatPaginatorModule,
	MatSelectModule, MAT_DATE_LOCALE, MatCheckboxModule, MatIconModule, MatRadioButton, MatRadioModule, MatTabsModule, MatSliderModule, MatAutocompleteModule, MatExpansionModule, } from '@angular/material';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { ConsultationsListComponent } from './pages/consultations-list/consultations-list.component';
import { MatTableModule, MatChipsModule } from '@angular/material';
import { EditConsultationComponent } from './pages/edit-consultation/edit-consultation.component';
import { CreateConsultationDialogComponent } from './pages/consultations-list/create-consultation-dialog/create-consultation-dialog.component';
import { DoctorsService } from '../../../core/services/doctors.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptService } from '../../../core/_base/crud/utils/intercept.service';
import { ConsultationsService } from '../../../core/services/consultations.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PathologiesComponent } from './pages/edit-consultation/pathologies/pathologies.component';
import { ObstetricComponent } from './pages/edit-consultation/obstetric/obstetric.component';
import { AddPathologieDialogComponent } from './pages/edit-consultation/pathologies/add-pathologie-dialog/add-pathologie-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoadingComponent } from '../../../components/loading.component';

import { TreatmentComponent } from './pages/edit-consultation/treatment/treatment.component';
import { AddTreatmentDialogComponent } from './pages/edit-consultation/treatment/add-treatment-dialog/add-treatment-dialog.component';

import { AutocompleteService } from '../../../core/services/autocomplete.service';

//MONITORING PEROP
import { MonitoringComponent } from './pages/monitoring/monitoring.component';
import { MonitoringHeaderComponent } from './pages/monitoring/monitoring-header/monitoring-header.component';
import { MonitoringOverviewComponent } from './pages/monitoring/monitoring-overview/monitoring-overview.component';

//SSPI
import { SSPIComponent } from './pages/sspi/sspi.component';
import { SSPIHeaderComponent } from './pages/sspi/sspi-header/sspi-header.component';
import { SSPIOverviewComponent } from './pages/sspi/sspi-overview/sspi-overview.component';
//Ambulatory
import { AmbulatoryComponent } from './pages/ambulatory/ambulatory.component';
import { AmbulatoryHeaderComponent } from './pages/ambulatory/ambulatory-header/ambulatory-header.component';
import { AmbulatoryOverviewComponent } from './pages/ambulatory/ambulatory-overview/ambulatory-overview.component';

import { ProtocolComponent } from './pages/edit-consultation/protocol/protocol.component';
import { ClinicalExamComponent } from './pages/edit-consultation/clinical-exam/clinical-exam.component';

import { TooltipModule } from "ngx-tooltip";

import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		TooltipModule,
		MatButtonToggleModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent,
				children: [
					{ path: '', component: ConsultationsListComponent },
					{ path: 'consultation/:consultationId', component: EditConsultationComponent},
					{ path: 'monitoring/:consultationId', component: MonitoringComponent},
					{ path: 'sspi/:consultationId', component: SSPIComponent},
					{ path: 'ambulatory/:consultationId', component: AmbulatoryComponent}
				]
			},
		]),
		MatTableModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatChipsModule,
		HttpClientModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatCheckboxModule,
		MatIconModule,
		MatRadioModule,
		CKEditorModule,
		MatTabsModule,
		MatPaginatorModule,
		MatSliderModule,
		MatExpansionModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
		DoctorsService,
		ConsultationsService,
		AutocompleteService
	],
	declarations: [
		DashboardComponent,
		ConsultationsListComponent,
		EditConsultationComponent,
		CreateConsultationDialogComponent,
		PathologiesComponent,
		AddPathologieDialogComponent,
		TreatmentComponent,
		AddTreatmentDialogComponent,
		MonitoringComponent,
		MonitoringHeaderComponent,
		MonitoringOverviewComponent,
		SSPIComponent,
		SSPIHeaderComponent,
		SSPIOverviewComponent,
		AmbulatoryComponent,
		AmbulatoryHeaderComponent,
		AmbulatoryOverviewComponent,
		ObstetricComponent,
		ProtocolComponent,
		ClinicalExamComponent
	],
	entryComponents: [
		CreateConsultationDialogComponent,
		PathologiesComponent,
		AddPathologieDialogComponent,
		TreatmentComponent,
		AddTreatmentDialogComponent
	]
})
export class DashboardModule {
}
