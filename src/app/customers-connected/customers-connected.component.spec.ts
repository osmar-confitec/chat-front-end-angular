import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersConnectedComponent } from './customers-connected.component';

describe('CustomersConnectedComponent', () => {
  let component: CustomersConnectedComponent;
  let fixture: ComponentFixture<CustomersConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersConnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
