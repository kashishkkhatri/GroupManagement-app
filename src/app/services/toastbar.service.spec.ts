import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastbarService } from './toastbar.service';

describe('ToastbarService', () => {
  let service: ToastbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
    });
    service = TestBed.inject(ToastbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
