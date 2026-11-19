import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginuser } from './loginuser';

describe('Loginuser', () => {
  let component: Loginuser;
  let fixture: ComponentFixture<Loginuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginuser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginuser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
