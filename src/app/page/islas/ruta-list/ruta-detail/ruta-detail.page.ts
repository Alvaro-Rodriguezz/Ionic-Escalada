import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaService} from '../../../../services/ruta.service';
import {Ruta} from '../../../../services/ruta.model';
import {ToastController} from '@ionic/angular';
import {AuthenticateService} from '../../../../services/authenntication.service';

@Component({
  selector: 'app-ruta-detail',
  templateUrl: './ruta-detail.page.html',
  styleUrls: ['./ruta-detail.page.scss'],
})
export class RutaDetailPage implements OnInit {

  ruta: Ruta = {
    dificultad: '',
    isla: '',
    nombre: '',
    urlFoto: ''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private rutaService: RutaService,
              private router: Router,
              private toastController: ToastController,
              private auth: AuthenticateService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.rutaService.getRutaId(id).subscribe(ruta => {
        this.ruta = ruta;
      });
    }
  }

  deleteRuta(){
    if (this.auth.isLogged){
      this.rutaService.deleteruta(this.ruta.id, this.ruta.urlFoto).then(() => {
        this.router.navigateByUrl('/home/' + this.ruta.isla);
        this.showToast('Ruta eliminada');
      }, err => {
        const msg = 'Error: '  + err;
        this.showToast(msg);
        console.log(err);
      });
    } else {
      this.showToast('El usuario debe estar registrado');
    }
  }

  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
