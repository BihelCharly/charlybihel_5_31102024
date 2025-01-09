import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { expect } from '@jest/globals';
import { SessionInformation } from '../../../interfaces/sessionInformation.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';

describe('Unitary test for the Auth Service', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test confirm that there are no more pending requests
    httpTestingController.verify();
  });
  // Test to Login
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return expected session information', () => {
    const loginRequest: LoginRequest = {
      email: 'email1',
      password: 'passwd1',
    };
    const expectedSessionInfo: SessionInformation = {
      token: 'token1',
      type: 'type1',
      id: 1,
      username: 'email1',
      firstName: 'firstname1',
      lastName: 'lastname1',
      admin: false,
    };

    authService
      .login(loginRequest)
      .subscribe((sessionInfo: SessionInformation) =>
        expect(sessionInfo).toEqual(expectedSessionInfo)
      );

    // `expectOne()`has to match the requested URL
    const req: TestRequest = httpTestingController.expectOne('api/auth/login');

    // Confirm that the request is POST
    expect(req.request.method).toEqual('POST');

    // Confirm that the request is body is session1.
    expect(req.request.body).toEqual(loginRequest);

    // Return mocked data and causing observable to resolve
    req.flush(expectedSessionInfo);
  });
});
