import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { AddTreatmentDialogComponent } from './add-treatment-dialog/add-treatment-dialog.component';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AutocompleteService } from '../../../../../../core/services/autocomplete.service';
import { Treatment } from '../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
  entryComponents: [AddTreatmentDialogComponent]
})
export class TreatmentComponent implements OnInit {

  @Input() title: string;
  @Input() inputPlaceholder: string = 'Pathologie';
  @Input() iconPath: string;
  @Input() noneText: string = 'Aucun';
  @Input() values: Array<Treatment> = [];
  @Input() autocomplete: string = null;

  @Output() change = new EventEmitter();

  inputValue: string = '';
  customs : Treatment[] = [];
  selecteds : Treatment[] = [];
  autocompOptions = [];
  filteredAutocompOptions = [];
  lastValue = '';
  choices: Treatment[] = [];
  morning = [];
  midday = [];
  evening = [];
  night = [];
  uniti = 0;
  unit= [];
  i = 0;
  unittype: string[] = ['mg','ml','l']; 
  medics = [
    {id: 1, name: "morning"},
    {id: 2, name: "midday"},
    {id: 3, name: "evening"},
    {id: 4, name: "night"},
    {id: 5, name: "unit"}, 
  ];
  // morning = [
  //   {
  //     id: 
  //   }
  // ]

  constructor(
    private dialog: MatDialog,
    private autocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    for (let curr of this.values) {
      if (this.isValInArray(this.choices, curr))
        this.selecteds.push(curr);
      else
        this.customs.push(curr);
    }
    for( this.i = 0;this.i < this.customs.length;this.i++){
      console.log(this.customs[this.i].medic_cis);
      this.morning[this.customs[this.i].medic_cis] = 0;
      this.midday[this.customs[this.i].medic_cis] = 0;
      this.evening[this.customs[this.i].medic_cis] = 0;
      this.night[this.customs[this.i].medic_cis] = 0;
      this.unit[this.customs[this.i].medic_cis] = "mg";

    }
    
  }



  openAddDialog() {
    const { title, iconPath, selecteds, choices } = this;
    const dialogRef = this.dialog.open(AddTreatmentDialogComponent, {
      width: '600px',
      data: {
        title,
        iconPath,
        selecteds,
        choices
      }
    });
    dialogRef.afterClosed().subscribe((items) => {
      if (items) {
        this.selecteds = items;
        console.log(items);
        this.emitValues();
      }
    });
  }

  toggleItem(event, val) {
    const isCustom = !this.isValInArray(this.choices, val);
    const dest = isCustom ? this.customs : this.selecteds;

    if (!this.isValInArray(dest, val)) {
      dest.push(val);
    } else {
      dest.splice(this.getValIndex(dest, val), 1);
    }
    console.log(val.medic_cis);
    this.emitValues();
  }

  addCustom(val) {
    if (!val) {
      this.openAddDialog();
      return;
    }

    if (this.isValInArray(this.customs, val)) {
      return ;
    }

    this.customs.unshift(val);

    this.emitValues();
  }

  reset() {
    this.customs = [];
    this.selecteds = [];
    this.change.emit([]);
  }

  private emitValues() {
    const values = [...this.customs, ...this.selecteds];
    this.change.emit(values);
  }

  onInputChanged(event){
    
    if (this.autocomplete) {
      if (this.inputValue.length == 3 && !this.autocompOptions.length) {
        this.autocompleteService[this.autocomplete](this.inputValue).subscribe(data => {
          this.autocompOptions = data;
          this.filteredAutocompOptions = data;
        })
      } else if (this.inputValue.length < 3) {
        this.autocompOptions = [];
        this.filteredAutocompOptions = [];
      } else if (this.autocompOptions) {
        this.filteredAutocompOptions = this.autocompOptions.filter(result => {
          if (result.medic_name.match(this.inputValue.toUpperCase()))
            return result;
        })
      }
    }
  }

  isValInArray(objArray: Treatment[], val: Treatment) {
    return objArray.some(a => a.medic_cis == val.medic_cis);
  }

  getValIndex(objArray: Treatment[], val: Treatment) {
    return objArray.findIndex(a => a.medic_cis == val.medic_cis);
  }

  displayfn(val: Treatment) {
    return val ? val.medic_name : undefined;
  }

  selected_option(event) {
      console.log(event.option.value.medic_cis);
      this.morning[event.option.value.medic_cis] = 0;
      this.midday[event.option.value.medic_cis] = 0;
      this.evening[event.option.value.medic_cis] = 0;
      this.night[event.option.value.medic_cis] = 0;
      this.unit[event.option.value.medic_cis] = "mg";
    console.log(event.option.value);
    this.inputValue = '';
    this.filteredAutocompOptions = [];
    this.autocompOptions = [];
    this.addCustom(event.option.value);
  }
  increase(data,id){
    console.log(this.customs)
    console.log(id);
    if(data == 1){
      console.log(this.morning[id])
      if(this.morning[id] == undefined) {
        this.morning[id] = 0;
      }
      this.morning[id]++;
    }
    else if(data == 2){
      console.log(this.midday[id])
      if(this.midday[id] == undefined) {
        this.midday[id] = 0;
      }
      this.midday[id]++;
    }
    else if(data == 3){
      console.log(this.evening[id])
      if(this.evening[id] == undefined) {
        this.evening[id] = 0;
      }
      this.evening[id]++;
    }
    else if(data == 4){
      console.log(this.night[id])
      if(this.night[id] == undefined) {
        this.night[id] = 0;
      }
      this.night[id]++;
    }
    else if(data == 5){
      this.uniti++;
      this.unit[id]=this.unittype[this.uniti%3];
    }
  }
  decrease(data,id){
    if(data == 1){
      console.log(this.morning[id])
      if(this.morning[id]>0){
        if(this.morning[id] == undefined) {
          this.morning[id] = 0;
        }
        this.morning[id]--;
      }
    }
    else if(data == 2){
      if(this.midday[id]>0){
        if(this.midday[id] == undefined) {
          this.midday[id] = 0;
        }
        this.midday[id]--;
      }
    }
    else if(data == 3){
      if(this.evening[id]>0){
        if(this.evening[id] == undefined) {
          this.evening[id] = 0;
        }
        this.evening[id]--;
      }
    }
    else if(data == 4){
      if(this.night[id]>0){
        if(this.night[id] == undefined) {
          this.night[id] = 0;
        }
        this.night[id]--;
      }
    }
    else if(data == 5){
      this.uniti++;
      this.unit[id]=this.unittype[2-this.uniti%3];
    }
  }

}
