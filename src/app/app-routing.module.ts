import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', title: 'login', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', title: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login', title: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'correspondencedetails', title: 'correspondencedetails',
    loadChildren: () => import('./pages/correspondencedetails/correspondencedetails.module').then( m => m.CorrespondencedetailsPageModule)
  },
  {
    path: 'add-correspondence', title: 'add-correspondence',
    loadChildren: () => import('./pages/add-correspondence/add-correspondence.module').then( m => m.AddCorrespondencePageModule)
  },
  {
    path: 'editcorrespondence', title: 'editcorrespondence',
    loadChildren: () => import('./pages/editcorrespondence/editcorrespondence.module').then( m => m.EditcorrespondencePageModule)
  },
  {
    path: 'sendtomodal', title: 'logsendtomodalin',
    loadChildren: () => import('./pages/sendtomodal/sendtomodal.module').then( m => m.SendtomodalPageModule)
  },
  {
    path: 'corresdetailsbeforesend', title: 'corresdetailsbeforesend',
    loadChildren: () => import('./pages/corresdetailsbeforesend/corresdetailsbeforesend.module').then( m => m.CorresdetailsbeforesendPageModule)
  },
  {
    path: 'recipientdetials', title: 'recipientdetials',
    loadChildren: () => import('./pages/recipientdetials/recipientdetials.module').then( m => m.RecipientdetialsPageModule)
  },
  {
    path: 'manageorganizations', title: 'logmanageorganizationsin',
    loadChildren: () => import('./pages/manageorganizations/manageorganizations.module').then( m => m.ManageorganizationsPageModule)
  },
  {
    path: 'manageusers', title: 'manageusers',
    loadChildren: () => import('./pages/manageusers/manageusers.module').then( m => m.ManageusersPageModule)
  },
  {
    path: 'neworganizationmodal', title: 'neworganizationmodal',
    loadChildren: () => import('./pages/neworganizationmodal/neworganizationmodal.module').then( m => m.NeworganizationmodalPageModule)
  },
  {
    path: 'addorganizationusers', title: 'addorganizationusers',
    loadChildren: () => import('./pages/addorganizationusers/addorganizationusers.module').then( m => m.AddorganizationusersPageModule)
  },
  {
    path: 'neworganizationusersmodal', title: 'neworganizationusersmodal',
    loadChildren: () => import('./pages/neworganizationusersmodal/neworganizationusersmodal.module').then( m => m.NeworganizationusersmodalPageModule)
  },
  {
    path: 'newusermodal', title: 'newusermodal',
    loadChildren: () => import('./pages/newusermodal/newusermodal.module').then( m => m.NewusermodalPageModule)
  },
  {
    path: 'edituser', title: 'edituser',
    loadChildren: () => import('./pages/edituser/edituser.module').then( m => m.EdituserPageModule)
  },
  {
    path: 'signup', title: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'resetpass', title: 'resetpass',
    loadChildren: () => import('./pages/resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'qrcode', title: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'recipientdetialsonetomany', title: 'recipientdetialsonetomany',
    loadChildren: () => import('./pages/recipientdetialsonetomany/recipientdetialsonetomany.module').then( m => m.RecipientdetialsonetomanyPageModule)
  },
  {
    path: 'tab4', title: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }
  //{ path: '**', component: LoginPage }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
