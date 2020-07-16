import { Component, OnInit } from '@angular/core';
import {IslasService} from '../../services/islas.service';
import {Observable} from 'rxjs';
import {Islas} from '../../services/islas.model';
import {AlertController, NavController} from '@ionic/angular';
import {AuthenticateService} from '../../services/authenntication.service';

@Component({
  selector: 'app-islas',
  templateUrl: './islas.page.html',
  styleUrls: ['./islas.page.scss'],
})
export class IslasPage implements OnInit {

  private islas: Observable<Islas[]>;
  userEmail: string;
  constructor(private islasSservice: IslasService,
              private navCtrl: NavController,
              private authService: AuthenticateService,
              private authSvc: AuthenticateService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.islas = this.islasSservice.getIslas();
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack('').then((e) => {
        if (e) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
        return false;
      });
    }
  }

  logout() {
    this.authService.logoutUser()
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
  }

  userConnect() {
    return !!this.authSvc.isLogged;
  }

  async usuarioAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      subHeader: this.userEmail,
      buttons: ['Cerrar']
    });

    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  goLoginPage() {
    this.navCtrl.navigateBack('/login').then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
      return false;
    });
  }

}
