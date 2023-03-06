import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from '../consultas-service/consultas.service';
import { DatePipe } from '@angular/common';

declare var window: any;
@Component({
  selector: 'app-menu-consultas',
  templateUrl: './menu-consultas.component.html',
  styleUrls: ['./menu-consultas.component.less']
})
export class MenuConsultasComponent implements OnInit{
  public usuario: string = '';
  public consultas: any;
  public especialidades: any;
  public medicos: any;
  public medico: any;
  public agendas: any;
  public horarios: any;

  public especialidade: string = '';
  public nome: string = '';
  public dia: string = '';
  public horario: string = ''
  public agendaId: string = '';

  public showModal:boolean=  false;
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
    this.medicos = ''
    this.especialidade = e.target.value
    this.consultasService.getMedicosPorEspecialidade(this.especialidade).subscribe((data) =>
      this.medicos = data
    )
  }

  public changeMedico(e: any){
    this.agendas = ''
    this.medico = e.target.value
    this.nome = this.medico.nome
    this.consultasService.getAgendasMedico(this.medico.id).subscribe((data) =>
      this.agendas = data
    )
  }

  public changeDia(e: any){
    this.horarios = ''
    this.dia = e.target.value
    this.consultasService.getHorariosMedico(this.medico.id, this.dia).subscribe((data) =>{
      this.horarios = data
      this.agendaId = this.horarios[0].id
      this.horarios = this.horarios[0].horarios
    })
  }

  public changeHorario(e: any){
    this.horario = ''
    this.horario = e.target.value
  }

  public agendarConsulta(){
    this.consultasService.agendarConsulta(this.agendaId, this.horario).subscribe((data) =>{
      console.log('Consulta agendada: ', data)
      this.ngOnInit()
    })
  }

  public dateTransform(data: string){
    const date = new Date(data);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate
  }
}
