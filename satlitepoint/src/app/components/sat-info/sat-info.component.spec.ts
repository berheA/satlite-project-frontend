import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatInfoComponent } from './sat-info.component';

describe('SatInfoComponent', () => {
  let component: SatInfoComponent;
  let fixture: ComponentFixture<SatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
