// ANGULAR
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
// SERVICE
import { UserService } from './user.service';
// USER MODEL
import { User } from '../interfaces/user.interface';
// JEST
import { expect } from '@jest/globals';

// TEST
describe('Unitary test for the User Service', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const user: User = {
    id: 1,
    email: 'email@me.com',
    lastName: 'last',
    firstName: 'first',
    admin: false,
    password: 'pass',
    createdAt: new Date('2000/01/01'),
    updatedAt: new Date('2001/01/01'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    // After each test confirm that there are no more pending requests
    httpTestingController.verify();
  });
  // Test to GET user
  it('should return user', () => {
    const expectedUser: User = user;

    service
      .getById('1')
      .subscribe((user: User) => expect(user).toEqual(expectedUser));

    // `expectOne()`has to match the requested URL
    const req: TestRequest = httpTestingController.expectOne('api/user/1');

    // Confirm that the request is GET
    expect(req.request.method).toEqual('GET');

    // Return mocked data and causing observable to resolve
    req.flush(expectedUser);
  });

  // Test to DELETE user
  it('should return deleted user', () => {
    service
      .delete('1')
      .subscribe((next) => expect(next).toEqual(expect.anything()));

    // `expectOne()` has to match the requested URL
    const req: TestRequest = httpTestingController.expectOne('api/user/1');

    // Confirm that the request is DELETE
    expect(req.request.method).toEqual('DELETE');

    // Return mocked data and causing observable to resolve
    req.flush({});
  });
});
