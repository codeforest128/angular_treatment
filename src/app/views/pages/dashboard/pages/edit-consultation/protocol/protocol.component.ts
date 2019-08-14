import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InterventionProtocol } from '../../../../../../core/classes/consultation_class';
import * as deepmerge from 'deepmerge';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kt-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {

  @Input() title: string;
  @Input() value: InterventionProtocol = new InterventionProtocol;

  @Output() change = new EventEmitter();

  inputValue;
  currentValue: InterventionProtocol = new InterventionProtocol();

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

  changeASA(asa) {
    this.currentValue.ASA = asa;
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

 choiceToggled(choice) {
   choice.active = !choice.active;
   this.emitValues();
 }

}
