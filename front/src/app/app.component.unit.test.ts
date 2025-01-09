// ANGULAR
import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
// COMPONENT
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
// SERVICE
import { SessionService } from './services/session.service';
// JEST
import { expect } from '@jest/globals';
import { Router } from '@angular/router';

// TEST
describe('Unitary test to build the Application', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  class MockSessionService {
    $isLogged(): Observable<boolean> {
      return of<boolean>(true);
    }
    logOut(): void {
      ('');
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [{ provide: SessionService, useClass: MockSessionService }],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should return true', () => {
    app.$isLogged().subscribe((boolean: boolean) => {
      expect(boolean).toEqual(true);
    });
  });

  it('should logout the user', () => {
    const sessionService = TestBed.inject(SessionService);
    jest.spyOn(sessionService, 'logOut');
    jest.spyOn(router, 'navigate');
    app.logout();
    expect(sessionService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
