import { TestBed } from '@angular/core/testing';

import { GroupUserService } from './group-user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GroupUserService', () => {
  let service: GroupUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupUserService]
    });
    service = TestBed.inject(GroupUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
