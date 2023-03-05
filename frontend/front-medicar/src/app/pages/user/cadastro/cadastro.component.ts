import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.less']
})
export class CadastroComponent implements OnInit{
  public form: FormGroup;
  public senhaVisivel: boolean = false;
  public senhaConfirmacaoVisivel: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      senhaConfirmacao: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  public mostrarSenha(){
    const btn = document.getElementById('btn-senha') as HTMLInputElement
    this.senhaVisivel = !this.senhaVisivel
    if (this.senhaVisivel && btn.type == 'password'){
      btn.type = 'text'
    }
    else{
      btn.type = 'password'
    }
  }

  public mostrarSenhaConfirmacao(){
    const btnConfirm = document.getElementById('btn-senha-confirmacao') as HTMLInputElement
    this.senhaConfirmacaoVisivel = !this.senhaConfirmacaoVisivel
    if (this.senhaConfirmacaoVisivel && btnConfirm.type == 'password'){
      btnConfirm.type = 'text'
    }
    else{
      btnConfirm.type = 'password'
    }
  }


}
