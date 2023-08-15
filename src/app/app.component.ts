import { Component, OnInit, ViewChild  } from '@angular/core';
import { GroupAddEditComponent } from './group-add-edit/group-add-edit.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from './services/group.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ToastbarService } from './services/toastbar.service';
import { GroupUserComponent } from './group-user/group-user.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GroupManagement-app';

  //dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'name',
    'group_code',
    'description',
    'action',
  ];
  constructor(private _dialog: MatDialog, private _groupService: GroupService,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private _toastbarService: ToastbarService) {}

  openAddEditGroup(){
    const dialogRef = this._dialog.open(GroupAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupList();
        }
      },
    });
  }
  ngOnInit(): void {
    this.getGroupList();
  }
  getGroupList() {
    this._groupService.getGroupList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        //this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: console.log,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteGroup(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete group?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._groupService.deleteGroup(id).subscribe({
          next: (res) => {
            this._toastbarService.openSnackBar('Group deleted!', 'done');
            this.getGroupList();
          },
          error: console.log,
        });
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(GroupAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupList();
        }
      },
    });
  }
  openGroupUserDetails(id: number){
    const dialogRef = this._dialog.open(GroupUserComponent,{
      data:{
        id: id
      }
    });
    //const dialogRef = this._dialog.open(GroupUserComponent);
  }
}
