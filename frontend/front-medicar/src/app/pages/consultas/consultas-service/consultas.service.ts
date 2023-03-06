import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AppConstants } from '../../AppConstants';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = environment.apiUrl
  private contants = AppConstants

  public getConsultas(){
    return this.httpClient.get(this.apiUrl+this.contants.consultas.consultas)
  }

  public deleteConsulta(id:number){
    return this.httpClient.delete(this.apiUrl+this.contants.consultas.consultas+id+"/")
  }
}
