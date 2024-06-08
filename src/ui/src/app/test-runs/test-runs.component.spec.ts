import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunsComponent } from './test-runs.component';

describe('TestRunsComponent', () => {
  let component: TestRunsComponent;
  let fixture: ComponentFixture<TestRunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRunsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
