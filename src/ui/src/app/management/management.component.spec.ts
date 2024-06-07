import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorManagementComponent } from './monitor-management.component';

describe('MonitorManagementComponent', () => {
  let component: MonitorManagementComponent;
  let fixture: ComponentFixture<MonitorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
