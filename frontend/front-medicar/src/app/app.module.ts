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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MedicarIconComponent,
    EyeIconComponent,
    EyeSlashIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
