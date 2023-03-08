import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.less']
})
export class CadastroComponent implements OnInit{
  public form: FormGroup;
  public senhaVisivel: boolean = false;
  public senhaConfirmacaoVisivel: boolean = false;
  public sessionUser: any;

  constructor(private formBuilder: FormBuilder, private signUpService: UserService, private router: Router){
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
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
  public goToLogin(){
    this.router.navigate(['/login'])
  }
  public sendSignUp(){
    const nome =  this.form.get('nome')!.value;
    const email =  this.form.get('email')!.value;
    const senha = this.form.get('senha')!.value;

    this.signUpService.createAccount(nome, email, senha).subscribe((data) =>{
      this.router.navigate(['/login'])
    }, error => console.log(error)
    )
  }

  public isValidEmail(field : string){
    this.form.get(field)?.touched
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
    return this.form.get(field)!.touched && !emailRegex.test(this.form.get(field)!.value) && this.form.get(field)!.value
  }
}
