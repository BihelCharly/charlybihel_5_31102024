// ANGULAR
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
// SERVICE
import { UserService } from './user.service';
// USER MODEL
import { User } from '../interfaces/user.interface';
// JEST
import { expect } from '@jest/globals';


// TEST
describe("Unitary test for the User Service", () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const user : User = {
    id: 100,
    email: "email@me.com",
    lastName: "last",
    firstName: "first",
    admin : false,
    password : "pass",
    createdAt: new Date('2000/01/01'),
    updatedAt: new Date('2001/01/01')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should return user', () => {
    const expectedUser: User = user;

    service.getById('100')
      .subscribe( (user : User) =>
        expect(user).toEqual(expectedUser));

    // The following `expectOne()` will match the request's URL.
    const req : TestRequest = httpTestingController.expectOne('api/user/100');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    req.flush(expectedUser);
  })
});
