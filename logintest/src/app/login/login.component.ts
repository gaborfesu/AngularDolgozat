/*
Fésű Gábor
2022.02.24
SzoftIN/2
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: [''],
      pass: ['']
    });
  }

  login() {
    let user = this.loginForm.value.user;
    let pass = this.loginForm.value.pass;
    this.auth.login(user, pass)
    .subscribe(res => {
      console.log(res);
      if (res) {
        localStorage.setItem('currentUser', 
        JSON.stringify({token: res.token})
        );
        this.router.navigate(['groups']);
      }else{
        alert("A belépés sikertelen!");
      }
    })

  }

}