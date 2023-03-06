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

  constructor(private consultasService: ConsultasService, private router: Router){}

  ngOnInit(): void {
    this.initTable()
    this.usuario = sessionStorage.getItem('usuario')!
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
}
