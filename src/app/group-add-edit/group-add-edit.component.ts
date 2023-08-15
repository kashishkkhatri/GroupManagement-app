import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastbarService } from '../services/toastbar.service';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.scss']
})
export class GroupAddEditComponent implements OnInit{
  groupForm: FormGroup;
  public title:string = "Add";

  constructor(private _fb: FormBuilder, 
    private _groupService: GroupService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _dialogRef: MatDialogRef<GroupAddEditComponent>,
    private _toastbarService: ToastbarService ) {

    this.groupForm = this._fb.group({
      name: '',
      group_code: '',
      description: '',
    });
  }
  ngOnInit(): void {
    this.groupForm.patchValue(this.data);
    this.title = this.data ? "Edit": "Add";

  }
  onFormSubmit() {
    if (this.groupForm.valid) {
      if (this.data) {
        this._groupService
          .updateGroup(this.data.id, this.groupForm.value)
          .subscribe({
            next: (val: any) => {
              this._toastbarService.openSnackBar('Group detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._groupService.addGroup(this.groupForm.value).subscribe({
          next: (val: any) => {
            this._toastbarService.openSnackBar('Group added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
