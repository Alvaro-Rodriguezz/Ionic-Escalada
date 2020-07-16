import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthenticateService} from '../../services/authenntication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };

  constructor(

      private navCtrl: NavController,
      private authService: AuthenticateService,
      private formBuilder: FormBuilder

  ) { }

  ngOnInit() {

    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  loginUser(value) {
    this.authService.loginUser(value)
        .then(res => {
          console.log(res);
          console.log('Se inicio sesión correctamente');
          this.errorMessage = '';
          this.navCtrl.navigateForward('/home').then((e) => {
            if (e) {
              console.log('Navigation is successful!');
            } else {
              console.log('Navigation has failed!');
            }
            return false;
          });
        }, err => {
          this.errorMessage = err.message;
        });
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register').then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
      return false;
    });
  }

}
