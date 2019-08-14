import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Treatment } from '../../../../../../../core/classes/consultation_class';

@Component({
  selector: 'kt-add-treatment-dialog',
  templateUrl: './add-treatment-dialog.component.html',
  styleUrls: ['./add-treatment-dialog.component.scss']
})
export class AddTreatmentDialogComponent implements OnInit {
  choices : Treatment[] = [];
  selecteds : Treatment[] = [];
  title;
  iconPath;

  constructor(
    private dialog: MatDialogRef<AddTreatmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit() {
    this.title = this.data.title;
    this.iconPath = this.data.iconPath;
    this.selecteds = this.data.selecteds;
    this.choices = this.data.choices;
  }

  toggleItem(event, val: Treatment) {
    if (!this.isValInArray(this.selecteds, val)) {
      this.selecteds.push(val);
    } else {
      this.selecteds.splice(this.getValIndex(this.selecteds, val), 1);
    }
  }

  close(choices) {
    this.dialog.close(choices);
  }

  isValInArray(objArray: Treatment[], val: Treatment) {
    return objArray.some(a => a.medic_name == val.medic_name);
  }

  getValIndex(objArray: Treatment[], val: Treatment) {
    return objArray.findIndex(a => a.medic_name == val.medic_name);
  }
}
