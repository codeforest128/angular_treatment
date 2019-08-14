import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pathology } from '../../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-add-pathologie-dialog',
  templateUrl: './add-pathologie-dialog.component.html',
  styleUrls: ['./add-pathologie-dialog.component.scss']
})
export class AddPathologieDialogComponent implements OnInit {
  currentValues: Pathology[] = [];
  currentDefaultValues: Pathology[] = [];
  defaultValues: Pathology[] = [];
  title;
  iconPath;

  constructor(
    private dialog: MatDialogRef<AddPathologieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.title = this.data.title;
    this.iconPath = this.data.iconPath;
    this.currentValues = this.data.currentValues;
    this.currentDefaultValues = this.data.currentDefaultValues;
    this.defaultValues = this.data.defaultValues;
    this.updateValues();
  }

  toggleItem(event, val) {
    let index;
    if ((index = this.getValIndex(this.currentValues, val)) >= 0)
      this.currentValues.splice(index, 1);
    else
      this.currentValues.unshift(val);
      console.log(val, index)
    this.updateValues();
  }

  updateValues() {
    this.currentDefaultValues = [...this.defaultValues];
    for (let curr of this.currentValues) {
      let index;
      if ((index = this.getValIndex(this.currentDefaultValues, curr)) >= 0)
        this.currentDefaultValues.splice(index, 1);
    }
  }

  close(data) {
    this.dialog.close(data);
  }

  isValInArray(objArray: Pathology[], val: Pathology) {
    return objArray.some(a => a.pathology_short_name == val.pathology_short_name);
  }

  getValIndex(objArray: Pathology[], val: Pathology) {
    return objArray.findIndex(a => a.pathology_short_name == val.pathology_short_name);
  }
}
