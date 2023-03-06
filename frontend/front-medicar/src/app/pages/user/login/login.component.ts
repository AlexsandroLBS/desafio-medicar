import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit{

  public form: FormGroup;
  public senhaVisivel: boolean = false;
  public sessionUser: any;
  public lembrarSenha:boolean = false;
  constructor(private formBuilder: FormBuilder,
              private loginService: UserService,
              private router: Router
              ){
    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [localStorage.getItem('senha'), Validators.required]
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
  public createAccount(){
    this.router.navigate(['/cadastro'])
  }
  public sendLogin(){
    const senha = this.form.get('senha')!.value;
    const isEmail = /@/.test(this.form.get('usuario')!.value);

    const nome = isEmail ? "" : this.form.get('usuario')!.value ;
    const email = isEmail ? this.form.get('usuario')!.value  : "";

    this.loginService.userLogin(nome, email, senha).subscribe((data) =>{
      this.sessionUser = data;
      sessionStorage.setItem('usuario', this.sessionUser.nome)
      if(this.lembrarSenha){
        localStorage.setItem('senha', senha)
      }
      else{
        localStorage.setItem('senha', '')
      }
      this.router.navigate([`menu/`])
    }
    )
  }
}
