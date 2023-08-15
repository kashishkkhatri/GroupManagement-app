import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastbarService } from '../services/toastbar.service';
import { GroupService } from '../services/group.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { GroupUserService } from '../services/group-user.service';
import { UserService } from '../services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-user',
  templateUrl: './group-user.component.html',
  styleUrls: ['./group-user.component.scss']
})
export class GroupUserComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  public finalUsersList!:any;
  public group: string = "";
  private groupusers: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'action',
  ];
  public selectedUserControl = new FormControl('');
  public selectedUser:number =0;

  constructor(private _dialog: MatDialog,private _groupService: GroupService,
    private _groupUserService: GroupUserService,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
   private _toastbarService: ToastbarService) {}

  ngOnInit(): void {
    this.getGroupUserList();
   
    }
  getUserList(){
    this._userService.getUsers().subscribe({
      next: (res) => {
        this.finalUsersList = res.filter(
         ( user:any) => !this.groupusers.some((groupUser:any) => groupUser.id === user.id)
        );
        this.selectedUser = 0;
        console.log(res);
      },
      error: console.log,
    });
  }
  getGroupUserList(){
    this._groupService.getGroupById(this.data.id).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.users);
        this.group = res.name
        this.groupusers = res.users;
        this.getUserList();
        console.log(res.users);
      },
      error: console.log,
    });
  }
  AssignToGroup() {
    this._groupUserService.addGroupUser(this.data.id, this.selectedUser).subscribe({
      next: (val: any) => {
        this._toastbarService.openSnackBar('User added to group successfully');
        this.getGroupUserList();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  deleteGroupUser(userId: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to remove user from this group?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this._groupUserService.deleteGroupUser(this.data.id, userId).subscribe({
          next: (res) => {
            this._toastbarService.openSnackBar('User removed from group!', 'done');
            this.getGroupUserList();
          },
          error: console.log,
        });
      }
    });
  }
}
