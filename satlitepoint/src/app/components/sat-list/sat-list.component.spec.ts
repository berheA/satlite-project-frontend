import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatListComponent } from './sat-list.component';

describe('SatListComponent', () => {
  let component: SatListComponent;
  let fixture: ComponentFixture<SatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
