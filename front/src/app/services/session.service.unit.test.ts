//ANGULAR
import { TestBed } from '@angular/core/testing';
// SERVICE
import { SessionService } from './session.service';
// JEST
import { expect } from '@jest/globals';

describe('Unitary test for the Session Service', () => {
  let service: SessionService;
  let isNotLoged: boolean = false;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false', () => {
    service.$isLogged().subscribe((boolean: boolean) => {
      expect(boolean).toEqual(isNotLoged);
    });
  });

});
