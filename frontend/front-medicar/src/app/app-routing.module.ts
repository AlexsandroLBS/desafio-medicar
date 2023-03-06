import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuConsultasComponent } from './pages/consultas/menu-consultas/menu-consultas.component';
import { CadastroComponent } from './pages/user/cadastro/cadastro.component';
import { LoginComponent } from './pages/user/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'menu', component: MenuConsultasComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
