import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockerManagementComponent } from './knocker-management.component';

describe('KnockerManagementComponent', () => {
  let component: KnockerManagementComponent;
  let fixture: ComponentFixture<KnockerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnockerManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnockerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
