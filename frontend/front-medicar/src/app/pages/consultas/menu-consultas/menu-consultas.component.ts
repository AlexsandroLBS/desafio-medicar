import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('novaConsulta') novaConsulta: any;

  constructor(private consultasService: ConsultasService, private router: Router){}

  ngOnInit(): void {
    this.initTable()
    this.usuario = sessionStorage.getItem('usuario')!
    const myModalEl = document.getElementById('nova-consulta')
    myModalEl!.addEventListener('show.bs.modal', event => {
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


  public dateTransform(data: string){
    const date = new Date(data);
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'dd/MM/yyyy');
    return formattedDate
  }

  public drawerDispose(){
    if (this.novaConsulta) {
      this.novaConsulta.dispose();
    }
  }
}
