import { Routes } from '@angular/router';
import { User } from './layouts/user/user';
import { Admin } from './layouts/admin/admin';
import { AuthAdminLogin } from './layouts/auth-admin-login/auth-admin-login';
import { adminGuardGuard } from './view/guards/admin-guard-guard';
import { noguarduserGuard } from './view/guards/noguarduser-guard';
import { guarduserGuard } from './view/guards/guarduser-guard';

export const routes: Routes = [
  {
    path: '',
    component: User,
    children: [
      {
        path: '',
        loadChildren: () => import('./view/user/home/home-module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./view/user/loginuser/loginuser-module').then((m) => m.LoginuserModule),canActivateChild: [noguarduserGuard]
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./view/user/register/register-module').then((m) => m.RegisterModule),canActivateChild: [noguarduserGuard]
      },
      {
        path: 'allstudents',
        loadChildren: () =>
          import('./view/user/allstudents/allstudents-module').then((m) => m.AllstudentsModule),canActivateChild: [guarduserGuard]
      },
      {
        path: 'edituser',
        loadChildren: () =>
          import('./view/user/edit-user/edit-user-module').then((m) => m.EditUserModule),canActivateChild: [guarduserGuard]
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./view/user/settings/settings-module').then((m) => m.SettingsModule)
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./view/user/courses/courses-module').then((m) => m.CoursesModule),canActivateChild: [guarduserGuard]
      },
      {
        path: 'checkout/:id',
        loadChildren: () =>
          import('./view/user/checkout/checkout-module').then((m) => m.CheckoutModule),canActivateChild: [guarduserGuard]
      }
    ],
  },
  {
  path: 'admin',
  children: [
    {
      path: 'login',
      component: AuthAdminLogin  // ✅ no guard here
    },
    {
      path: '',
      component: Admin,
      canActivate: [adminGuardGuard],  // ✅ guard only on protected routes
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        {
          path: 'dashboard',
          loadChildren: () => import('./view/admin/dashboard/dashboard-module').then(m => m.DashboardModule)
        },
        {
          path: 'allstudents',
          loadChildren: () => import('./view/admin/allstudents/allstudents-module').then(m => m.AllstudentsModule)
        },
        {
          path: 'addstudent',
          loadChildren: () => import('./view/admin/addstudent/addstudent-module').then(m => m.AddstudentModule)
        },
        {path:'instructors',loadChildren:()=>import('./view/admin/instructors/instructors-module').then(m=>m.InstructorsModule)},
        {path:'addinstructor',loadChildren:()=>import('./view/admin/add-instructor/add-instructor-module').then(m=>m.AddInstructorModule)},
        {path : 'messages', loadChildren: () => import('./view/admin/messages/messages-module').then(m => m.MessagesModule)},
        {path : 'settings', loadChildren: () => import('./view/admin/settings/settings-module').then(m => m.SettingsModule)},
        {path : 'courses', loadChildren: () => import('./view/admin/courses/courses-module').then(m => m.CoursesModule)},
        {path : 'addcourse', loadChildren: () => import('./view/admin/add-course/add-course-module').then(m => m.AddCourseModule)},
      ]
    }
  ]
},
];
