import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { SubheaderService } from '../../../../../core/_base/layout/services/subheader.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder } from '@angular/forms';
import { ConsultationsService } from '../../../../../core/services/consultations.service';
import { ActivatedRoute } from '@angular/router';
import {takeWhile, take, finalize, tap} from 'rxjs/operators'
import { LoadingOverlayService } from '../../../../../core/services/loading-overlay.service';
import { ConsultationModel } from '../../../../../core/classes/consultation_class';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'kt-sspi',
  templateUrl: './sspi.component.html',
  styleUrls: ['./sspi.component.scss']
})
export class SSPIComponent implements OnInit, OnDestroy {

	@ViewChild('chart', { static: true }) chart: ElementRef;
	@ViewChild('spo2bischart', { static: true }) spo2bischart: ElementRef;

	private alive = true;
	consultation: ConsultationModel = new ConsultationModel();

	Editor = ClassicEditor;
	editorConfig = {
	  toolbar: ['Bold', 'Italic'],
	  alignment: {
		options: ['left', 'right', 'center']
	  }
	};
	newForm = this.formBuilder.group({
		realTimeInput: this.formBuilder.group({
			heartFrequency: [''],
			spo2: [''],
			bp: [''],
			bis: [''],
			timer: [''],
		}),
		localAnesthesia: this.formBuilder.group({
			block: [''],
			drug: [''],
			concentration: [''],
			volume: [''],
			echoBoolean: [''],
			echoDifficulty: [''],
			problems: ['']
		}),
		multiAnalgesia: this.formBuilder.group({
			paracetamol: [''],
			nefopam: [''],
			tramadol: [''],
			ketoprofene: [''],
			morphine: [''],
		}),
		airwayMgt: this.formBuilder.group({
			sonde: [null],
			mask: [null],
			cormack: [null],
			attempt: [null],
			normal: [''],
			video: [''],
			fibro: [''],
			airtrach: [''],
		}),
		notes: ['', []],
	});
	time: number = 0;
	playTimer: boolean = false;
	timeLabels: string[] = [];
	interval;

  constructor(
	private formBuilder: FormBuilder,

	private SubHeaderService: SubheaderService,
	private ConsultationService: ConsultationsService,
	private ActivatedRoute: ActivatedRoute,
	private loadingOverlay: LoadingOverlayService) { }

  ngOnInit() {
	this.SubHeaderService.setTitle('sspi');
	this.initChart();
	this.ActivatedRoute.params.subscribe((params) => {
		this.ConsultationService
		  .getConsultationById(params.consultationId)
		  .pipe(takeWhile(() => this.alive))
		  .subscribe(consult => {
			console.log(consult);
			this.consultation = deepmerge(new ConsultationModel(), consult.tmp_consultation, { arrayMerge: (destinationArray, sourceArray, options) => sourceArray });
			Object.setPrototypeOf(this.consultation, ConsultationModel.prototype);
			console.log(this.consultation)
			this.loadingOverlay.setVisible(false);
			
		  })
	  });
  }

  ngOnDestroy() {
	  this.alive = false;
  }

  private initChart() {
	// For more information about the chartjs, visit this link
	// https://www.chartjs.org/docs/latest/getting-started/usage.html

	const chart = new Chart(this.chart.nativeElement, {
		type: 'line',
		data: {
			labels: this.timeLabels,
			datasets: [{}]
		},
		options: {
			responsive: true,
			legend: false,
			scales: {
				yAxes: [
					{
					ticks: {
						max: 250, // FC PA 0 - 250 steps de 10
						stepSize: 10,
						// sp02 bis 0 - 100 steps de
					}
				},
			]
			},
			title: {
				display: false
			},
		}
	});
	const spo2bischart = new Chart(this.spo2bischart.nativeElement, {
		type: 'line',
		data: {
			labels: this.timeLabels,
			datasets: [{}]
		},
		options: {
			responsive: true,
			legend: false,
			scales: {
				xAxes: [{
					ticks: {
						stepSize: 10
					}
				}],
				yAxes: [
					{
					ticks: {
						max: 100, // FC PA 0 - 250 steps de 10
						stepSize: 10,
						// sp02 bis 0 - 100 steps de
					}
				},
			]
			},
			title: {
				display: false
			},
		}
	});
}

startTimer() {
	this.playTimer = true;
	const today = new Date();
	today.setMinutes(today.getMinutes() - (today.getMinutes() % 10));
	this.timeLabels.push(`${today.getHours()}:${today.getMinutes()}`);

	for (let i = 0; i < 17; i++) {
		today.setMinutes(today.getMinutes() + 10);
		this.timeLabels.push(`${today.getHours()}:${today.getMinutes()}`);
	}
	this.initChart();
	console.log(this.timeLabels);
	// this.startTime =
	// this.interval = setInterval(() => {
	//   this.time++;
	// }, 1000);
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

  pauseTimer() {
	clearInterval(this.interval);
  }

}
