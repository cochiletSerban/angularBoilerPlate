import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../objects/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})

export class AuthPageComponent implements OnInit {
  @ViewChild('titleBar') titleBar;
  @ViewChild('loginPiky') loginPiky;
  @ViewChild('loginFb') loginFb;
  @ViewChild('loginEth') loginEth;
  @ViewChild('fromContainer') formContainer;
  @ViewChild('tab1') tab1;
  @ViewChild('tab2') tab2;
  showLogin = true;
  myEmailValidator = '';
  myPasswordValidator = '';
  myUserValidation = '';
  errMsg = '';
  loginLogo = '../../assets/img/PikyLogoCerc.png';
  user: User;
  loginForm: FormGroup;
  registerForm: FormGroup;
  show = false;
  constructor(private auth: AuthService, private render: Renderer2) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'password' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.email , Validators.required])
    });
    this.registerForm =  new FormGroup({
      'password' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'username' : new FormControl(null, Validators.required)
    });
  }

 shakeFrom() {
    this.render.addClass(this.formContainer.nativeElement, 'shake');
    setTimeout(() => {
      this.render.removeClass(this.formContainer.nativeElement, 'shake');
    }, 1000);
  }

  moveTitleBar(button: ElementRef) {
    this.render.addClass(this.titleBar.nativeElement, 'bounce');
    this.render.addClass(button.nativeElement, 'disabled');
    setTimeout(() => {
      this.render.removeClass(this.titleBar.nativeElement, 'bounce');
      this.render.removeClass(button.nativeElement, 'disabled');
    }, 1000);
  }

  login() {
    this.show = false;
    this.user = {
      username: '',
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    if (!this.loginForm.get('email').valid) {
      this.errMsg = 'Invalid email!';
      this.show = true;
      this.myEmailValidator = 'invalid';
      this.shakeFrom();
    } else if (!this.loginForm.get('password').valid ) {
      this.myEmailValidator = 'valid';
      this.errMsg = 'Invaild password';
      this.show = true;
      this.myPasswordValidator = 'invalid';
      this.shakeFrom();
    } else if (this.loginForm.valid) {
      this.moveTitleBar(this.loginPiky);
      this.myEmailValidator = 'valid';
      this.myPasswordValidator = 'valid';
      this.errMsg = '';
      this.auth.login(this.user).subscribe(
        resp => {
          console.log(resp);
        },
        err => {
          this.errMsg = err.error;
          this.show = true;
          if (this.errMsg.charAt(0) === 'N') {
            this.loginForm.controls['email'].setErrors({'incorrect': true});
            this.myEmailValidator = 'invalid';
            this.render.removeClass(this.titleBar.nativeElement, 'bounce');

            this.shakeFrom();
          } else {
            this.loginForm.controls['password'].setErrors({'incorrect': true});
            this.myPasswordValidator = 'invalid';
            this.render.removeClass(this.titleBar.nativeElement, 'bounce');

            this.shakeFrom();
          }
        }
      );
    }

  }

  register() {
    this.show = false;
    this.moveTitleBar(this.loginPiky);
    this.user = {
      username: '',
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    if(!this.registerForm.get('username').valid) {
      this.myUserValidation = 'invalid';
      this.errMsg = 'No  username';
      this.show = true;
      this.shakeFrom();
    } else if (!this.registerForm.get('email').valid) {
      this.errMsg = 'Invalid email!';
      this.show = true;
      this.myEmailValidator = 'invalid';
      this.shakeFrom();
    } else if (!this.registerForm.get('password').valid ) {
      this.myEmailValidator = 'valid';
      this.errMsg = 'Invaild password';
      this.show = true;
      this.myPasswordValidator = 'invalid';
      this.shakeFrom();
    } else if (this.registerForm.valid) {
      this.moveTitleBar(this.loginPiky);
      this.myEmailValidator = 'valid';
      this.myPasswordValidator = 'valid';
      this.myUserValidation = 'valid';
      this.errMsg = '';
      this.auth.register(this.user).subscribe(
        resp => console.log(resp),
        err => {
          this.errMsg = err.error;
          this.show = true;
          if (this.errMsg.charAt(0) === 'N') {
            this.loginForm.controls['email'].setErrors({'incorrect': true});
            this.myEmailValidator = 'invalid';
            this.render.removeClass(this.titleBar.nativeElement, 'bounce');

            this.shakeFrom();
          } else {
            this.loginForm.controls['password'].setErrors({'incorrect': true});
            this.myPasswordValidator = 'invalid';
            this.render.removeClass(this.titleBar.nativeElement, 'bounce');

            this.shakeFrom();
          }
        }
      );
    }
  }

  cleanForms(form: string) {

    if (form === 'login') {
      this.loginForm.reset();
      this.myEmailValidator = '';
      this.myPasswordValidator = '';
      this.show = false;
      this.errMsg = '';
      this.showLogin = false;

    } else {
      this.registerForm.reset();
      this.myEmailValidator = '';
      this.myPasswordValidator = '';
      this.myUserValidation = '';
      this.show = false;
      this.errMsg = '';

      this.showLogin = true;

    }
  }

  fbLogin() {
    this.moveTitleBar(this.loginFb);
  }

  ethLogin() {
    this.moveTitleBar(this.loginEth);
  }

  onHo(target: string, hovering: boolean) {

    if (hovering) {

      switch (target) {
        case 'piky':
          this.loginLogo = '../../assets/img/PikyLogoCerc.png';
        break;

        case 'eth':
          this.loginLogo = '../../assets/img/ethLogo.png';
        break;

        case 'fb':
          this.loginLogo = '../../assets/img/fb.png';
        break;
      }

    } else {
      this.loginLogo = '../../assets/img/PikyLogoCerc.png';
    }
  }

}