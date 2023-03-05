import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit{

  public form: FormGroup;
  public senhaVisivel: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
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
}
