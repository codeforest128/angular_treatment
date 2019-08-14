import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Clinical_Exam } from '../../../../../../core/classes/consultation_class';
import * as deepmerge from 'deepmerge';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kt-clinicalexam',
  templateUrl: './clinical-exam.component.html',
  styleUrls: ['./clinical-exam.component.scss']
})
export class ClinicalExamComponent implements OnInit {

  @Input() title: string;
  @Input() value: Clinical_Exam = new Clinical_Exam;
  @Input() iconPath: string;

  @Output() change = new EventEmitter();

  inputValue;
  currentValue: Clinical_Exam = new Clinical_Exam();

  constructor() { }

  ngOnInit() {
    if (this.value)
      this.currentValue = {...this.value}
  }

  toggleItem(event, val) {
    let index;
    this.emitValues();
  }

  onChange(event) {
    this.emitValues();
  }

  emitValues() {
    this.change.emit(this.currentValue);
  }

  generateRandomString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 ras_form() {
   this.currentValue.normal_cardiac_auscultation = true;
   this.currentValue.normal_pulmonary_auscultation = true;
   this.currentValue.veinous_access.choice_index = 0;
   this.emitValues();
 }

 choiceToggled(choice) {
   choice.active = !choice.active;
   this.emitValues();
 }

}
