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

  public getConsultas(){
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.consultas)
  }

  public deleteConsulta(id:number){
    return this.httpClient.delete(this.apiUrl+AppConstants.consultas.consultas+id+"/")
  }

  public getEspecialidade(id:string){
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.medico+"?id="+id)
  }

  public getEspecialidades(){
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.especialidades)
  }

  public getMedicosPorEspecialidade(especialidade: string) {
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.medicosEsp+"?especialidade="+especialidade)
  }

  public getAgendasMedico(id: string){
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.agenda+"?medico="+id)
  }

  public getHorariosMedico(id: string, data: string){
    return this.httpClient.get(this.apiUrl+AppConstants.consultas.agenda+"?medico="+id+'&data_inicio='+data+'&data_fim='+data)
  }

  public agendarConsulta(id: string, horario: string){
    return this.httpClient.post(this.apiUrl+AppConstants.consultas.consultas,{ agenda_id : id, horario: horario} )
  }


}
