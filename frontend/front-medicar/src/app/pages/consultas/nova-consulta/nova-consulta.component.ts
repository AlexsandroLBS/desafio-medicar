import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConsultasService } from '../consultas-service/consultas.service';

@Component({
  selector: 'nova-consulta-modal',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.less']
})
export class NovaConsultaComponent implements OnInit , OnChanges{

  public especialidades: any;
  public medicos: any;
  public medico: any;
  public agendas: any;
  public horarios: any;

  public especialidade: string = '';
  public dia: string = '';
  public horario: string = ''
  public agendaId: string = '';

  @Input() closeDrawer!: () => void;
  constructor(private consultasService: ConsultasService){}

  ngOnInit(): void {
    this.loadEspecialidades()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  public async loadEspecialidades(){
    this.consultasService.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.especialidades;
    })
  }

  public changeEspecialidade(e: any){
    this.especialidade = '';
    this.medico = ''
    this.especialidade = e.target.value

    console.log('veio aqui')
    if(this.especialidade){
      this.consultasService.getMedicosPorEspecialidade(this.especialidade).subscribe((data) =>
        this.medicos = data
      )
    }
  }

  public changeMedico(e: any){
    this.medico = e.target.value

    if(this.medico && this.medico!= null){
      this.consultasService.getAgendasMedico(this.medico).subscribe((data) =>
        this.agendas = data
      )
    }
  }

  public changeDia(e: any){
    this.horarios = ''
    this.dia = e.target.value
    if(this.dia && this.dia!= null){
      this.consultasService.getHorariosMedico(this.medico, this.dia).subscribe((data) =>{
        this.horarios = data
        this.agendaId = this.horarios[0].id
        this.horarios = this.horarios[0].horarios
      })
    }
  }

  public changeHorario(e: any){
    this.horario = ''
    this.horario = e.target.value
  }

  public agendarConsulta(){
    this.consultasService.agendarConsulta(this.agendaId, this.horario).subscribe((data) =>{
      console.log('Consulta agendada: ', data)
    })
  }


}
