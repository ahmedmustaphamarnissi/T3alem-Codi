import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminLogin } from './auth-admin-login';

describe('AuthAdminLogin', () => {
  let component: AuthAdminLogin;
  let fixture: ComponentFixture<AuthAdminLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAdminLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAdminLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
