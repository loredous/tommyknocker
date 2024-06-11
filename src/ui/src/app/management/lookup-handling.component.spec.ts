import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupDisplayComponent } from './lookup-handling.component';

describe('LookupHandlingComponent', () => {
  let component: LookupDisplayComponent;
  let fixture: ComponentFixture<LookupDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookupDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LookupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
