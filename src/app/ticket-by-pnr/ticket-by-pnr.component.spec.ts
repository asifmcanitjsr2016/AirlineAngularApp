import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketByPnrComponent } from './ticket-by-pnr.component';

describe('TicketByPnrComponent', () => {
  let component: TicketByPnrComponent;
  let fixture: ComponentFixture<TicketByPnrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketByPnrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketByPnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
