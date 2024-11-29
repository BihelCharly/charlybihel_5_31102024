// ANGULAR
import { ComponentFixture, TestBed } from '@angular/core/testing';
// COMPONENT
import { NotFoundComponent } from './not-found.component';
// JEST
import { expect } from '@jest/globals';


// TEST
describe('Unitary test for the NotFound component', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
