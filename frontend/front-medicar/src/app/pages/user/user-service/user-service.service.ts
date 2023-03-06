import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppConstants } from '../../AppConstants';

@Injectable()
export class UserService {

constructor(private httpClient: HttpClient) { }

  private apiUrl = environment.apiUrl
  private contants = AppConstants

  public userLogin(nome: string, email: string, senha: string ){
    return this.httpClient.post(this.apiUrl+this.contants.user.login, {
        nome: nome,
        email: email,
        senha: senha
      }
    )
  }

  public createAccount(nome: string, email: string, senha: string){
    return this.httpClient.post(this.apiUrl+this.contants.user.signup,{
        nome: nome,
        email: email,
        senha: senha
      }
    )
  }
}
