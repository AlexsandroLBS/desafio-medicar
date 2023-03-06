import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from '../consultas-service/consultas.service';

@Component({
  selector: 'app-menu-consultas',
  templateUrl: './menu-consultas.component.html',
  styleUrls: ['./menu-consultas.component.less']
})
export class MenuConsultasComponent implements OnInit{
  public consultas: any;
  public usuario: string = '';
  public especialidades: any = []

  public especialidade: string = '';
  public medico: string = '';
  public date: any = '';
  public horario: any = ''



  constructor(private consultasService: ConsultasService, private router: Router){}

  ngOnInit(): void {
    this.initTable()
    this.usuario = sessionStorage.getItem('usuario')!

    const myModalEl = document.getElementById('nova-consulta')
    myModalEl!.addEventListener('show.bs.modal', event => {
      this.loadEspecialidades();
  })
  }

  private initTable(){
    this.consultasService.getConsultas().subscribe((data) =>
    this.consultas = data)
  }

  public deleteConsulta(id: number){
    this.consultasService.deleteConsulta(id).subscribe((data) => this.ngOnInit())
  }

  public desconectar(){
    this.router.navigate(['/login'])
  }


  public async loadEspecialidades(){
    this.consultasService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.especialidades;
    })
  }

  public changeEspecialidade(e: any){
    this.especialidade = e.target.value

  }

  public loadMedicos(){

  }
}
