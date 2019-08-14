import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Obstetric } from '../../../../../../core/classes/consultation_class';
import * as deepmerge from 'deepmerge';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kt-obstetric',
  templateUrl: './obstetric.component.html',
  styleUrls: ['./obstetric.component.scss']
})
export class ObstetricComponent implements OnInit {

  @Input() title: string;
  @Input() inputPlaceholder: string = 'Pathologie';
  @Input() iconPath: string;
  @Input() noneText: string = 'Aucun';
  @Input() value: Obstetric = new Obstetric;
  @Input() patient_data: FormGroup;
  @Input() weight: number;

  @Output() change = new EventEmitter();
  @Output() weightChange = new EventEmitter();

  inputValue;
  currentValue: Obstetric = new Obstetric();

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

  private emitValues() {
    this.change.emit(this.currentValue);
    this.weightChange.emit(this.weight);
  }

  epidural_required_change(event) {
    if (this.currentValue.epidural_required) {
      this.currentValue.epidural.choice_index = null;
    }
    this.emitValues();
  }

  ras_form() {
    this.currentValue.easy_back = true;
    this.currentValue.preeclampsia = false;
    this.currentValue.varicoses = false;
    this.currentValue.epidural.choice_index = 0;
    this.currentValue.epidural_required = false;
    this.currentValue.foetus_presentation.choice_index = 0;
    this.currentValue.placenta.choice_index = 0;
    this.currentValue.fetal_biometrics.choice_index = 0;
    this.emitValues();
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

}
