import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { AddPathologieDialogComponent } from './add-pathologie-dialog/add-pathologie-dialog.component';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AutocompleteService } from '../../../../../../core/services/autocomplete.service';
import { Pathology } from '../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-pathologies',
  templateUrl: './pathologies.component.html',
  styleUrls: ['./pathologies.component.scss'],
  entryComponents: [AddPathologieDialogComponent]
})
export class PathologiesComponent implements OnInit {

  @Input() title: string;
  @Input() inputPlaceholder: string = 'Pathologie';
  @Input() iconPath: string;
  @Input() noneText: string = 'Aucun';
  @Input() values: Array<Pathology> = [];
  @Input() autocomplete: string = null;
  @Input() autocompType: string = null;
  @Input() defaultPatho: string = null;

  @Output() change = new EventEmitter();

  inputValue;
  autocompOptions = [];
  filteredAutocompOptions = [];
  lastValue = '';
  defaultValues : Pathology[] = [];
  currentDefaultValues: Pathology[] = [];
  currentValues = [];

  constructor(
    private dialog: MatDialog,
    private autocompleteService: AutocompleteService
  ) { }

  ngOnInit() {
    if (this.values && this.values.length)
      this.currentValues = [...this.values];
    if (this.defaultPatho) {
      this.autocompleteService.getDefaultPathologies(this.defaultPatho).subscribe(res => {
        this.defaultValues = [...res as Pathology[]];
        console.log(this.defaultValues)
        this.updateValues();
      });
    } 
  }

  openAddDialog() {
    const { title, iconPath, currentValues, currentDefaultValues, defaultValues } = this;
    const dialogRef = this.dialog.open(AddPathologieDialogComponent, {
      width: '600px',
      data: {
        title,
        iconPath,
        currentValues,
        currentDefaultValues,
        defaultValues
      }
    });

    dialogRef.afterClosed().subscribe((items) => {
      if (items) {
        this.currentValues = items;
        this.emitValues();
      }
    });
  }

  ras() {
    this.currentValues = this.defaultValues.filter(a => a['ras']);
    this.currentValues.forEach(f => this.currentDefaultValues.splice(this.currentDefaultValues.findIndex(e => e.pathology_cim10 === f.pathology_cim10),1));
    this.emitValues();
  }

  toggleItem(event, val) {
    let index;
    if ((index = this.getValIndex(this.currentValues, val)) >= 0)
      this.currentValues.splice(index, 1);
    else
      this.currentValues.unshift(val);
      console.log(val, index)
    this.updateValues();
    this.emitValues();
  }

  updateValues() {
    this.currentDefaultValues = [...this.defaultValues];
    for (let curr of this.currentValues) {
      let index;
      if ((index = this.getValIndex(this.currentDefaultValues, curr)) >= 0)
        this.currentDefaultValues.splice(index, 1);
    }
  }

  addCustom(val) {
    if (this.isValInArray(this.currentValues, val)) {
      return ;
    }

    this.currentValues.unshift(val);

    this.emitValues();
  }

  addCustomNoAutocomp() {
    console.log(this.values);

    if (this.isShortNameInArray(this.currentValues, this.inputValue)) {
      this.inputValue = '';
      return ;
    }
    let randomCim = this.generateRandomString(12);
    this.currentValues.unshift({pathology_short_name: this.inputValue, pathology_cim10: randomCim, display_name: null} as Pathology);
    this.inputValue = '';

    this.emitValues();
  }
  
  add_delete_comment(val: Object, add: boolean) {
    if (add)
      val['comment'] = '';
    else if (val.hasOwnProperty('comment')) {
      delete val['comment'];
      this.emitValues();
    }
  }

  reset() {
    this.currentValues = [];
    this.updateValues();
    this.change.emit([]);
  }

  private emitValues() {
    this.change.emit(this.currentValues);
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

  onInputChanged(event) {
    if (this.autocomplete) {
      if (this.inputValue.length === 3 && !this.autocompOptions.length) {
        this.autocompleteService[this.autocomplete](this.inputValue, this.autocompType).subscribe(res => {
          let data = (res && res.rows) ? res.rows : [];
          this.autocompOptions = data;
          this.filteredAutocompOptions = data;
        });
      } else if (this.inputValue.length < 3) {
        this.autocompOptions = [];
        this.filteredAutocompOptions = [];
      } else if (this.autocompOptions) {
        this.filteredAutocompOptions = this.autocompOptions.filter(result => {
          if (result.pathology_long_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").match(this.inputValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && !result.pathology_short_name.match('Suppr_'))
            return result;
        });
      }
    }
  }

  isValInArray(objArray: Pathology[], val: Pathology) {
    return objArray.some(a => a.pathology_cim10 === val.pathology_cim10);
  }

  isShortNameInArray(objArray: Pathology[], val: string) {
    return objArray.some(a => a.pathology_short_name === val);
  }

  getValIndex(objArray: Pathology[], val: Pathology) {
    return objArray.findIndex(a => a.pathology_cim10 === val.pathology_cim10);
  }

  displayfn(val: Pathology) {
    return val ? val.pathology_short_name : undefined;
  }

  selected_option(event) {
    this.inputValue = '';
    this.filteredAutocompOptions = [];
    this.autocompOptions = [];
    this.addCustom(event.option.value);
  }

}
