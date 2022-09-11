import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalngTemplateComponent } from './externalng-template.component';

describe('ExternalngTemplateComponent', () => {
  let component: ExternalngTemplateComponent;
  let fixture: ComponentFixture<ExternalngTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalngTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalngTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
