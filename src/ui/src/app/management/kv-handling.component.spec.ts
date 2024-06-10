import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvInputComponent } from './kv-handling.component';

describe('KvInputComponent', () => {
  let component: KvInputComponent;
  let fixture: ComponentFixture<KvInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KvInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KvInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
