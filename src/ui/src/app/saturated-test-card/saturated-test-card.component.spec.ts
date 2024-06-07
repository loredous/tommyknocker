import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaturatedTestCardComponent } from './saturated-test-card.component';

describe('SaturatedTestCardComponent', () => {
  let component: SaturatedTestCardComponent;
  let fixture: ComponentFixture<SaturatedTestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaturatedTestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaturatedTestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
