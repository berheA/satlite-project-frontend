import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPanelComponent } from './external-panel.component';

describe('ExternalPanelComponent', () => {
  let component: ExternalPanelComponent;
  let fixture: ComponentFixture<ExternalPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
