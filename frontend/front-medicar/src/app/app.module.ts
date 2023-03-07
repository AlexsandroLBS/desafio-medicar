import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/user/login/login.component';
import { CadastroComponent } from './pages/user/cadastro/cadastro.component';
import { MedicarIconComponent } from './pages/icon/medicar-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EyeIconComponent } from './pages/icon/eye';
import { EyeSlashIconComponent } from './pages/icon/eye-slash';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './pages/user/user-service/user-service.service';
import { MenuConsultasComponent } from './pages/consultas/menu-consultas/menu-consultas.component';
import { PlusIconComponent } from './pages/icon/plus-icon';
import { XIcon } from './pages/icon/x-icon';
import { NovaConsultaComponent } from './pages/consultas/nova-consulta/nova-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MedicarIconComponent,
    EyeIconComponent,
    EyeSlashIconComponent,
    MenuConsultasComponent,
    PlusIconComponent,
    XIcon,
    NovaConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
