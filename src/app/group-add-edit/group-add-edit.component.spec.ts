import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddEditComponent } from './group-add-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('GroupAddEditComponent', () => {
  let component: GroupAddEditComponent;
  let fixture: ComponentFixture<GroupAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAddEditComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} } 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(GroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
