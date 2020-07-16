import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaService} from '../../../services/ruta.service';
import {Observable} from 'rxjs';
import {Islas} from '../../../services/islas.model';
import {Ruta} from '../../../services/ruta.model';
import {AuthenticateService} from '../../../services/authenntication.service';

@Component({
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.page.html',
  styleUrls: ['./ruta-list.page.scss'],
})
export class RutaListPage implements OnInit {

  ordenar = 'nombre';
  asc = 'asc';
  mostrar = true;
  isla: string = this.activatedRoute.snapshot.paramMap.get('isla');
  private rutas: Observable<Ruta[]>
  constructor(private activatedRoute: ActivatedRoute,
              private rutaService: RutaService,
              private router: Router,
              private authSvc: AuthenticateService) {

  }

  ngOnInit() {
    if (this.isla){
      this.rutas = this.rutaService.getRutasEnIsla(this.isla);
      console.log(this.ordenar);
      console.log(this.asc);
    }
  }

  ordenarRutas(){
    this.rutas = this.rutaService.orderBy(this.ordenar, this.asc, this.isla);
  }

  cambiarAsc(tipo: string){
    this.asc = tipo;
    this.ordenarRutas();
    this.mostrar = !this.mostrar;
  }

  userConnect() {
    return this.authSvc.isLogged;
  }
}
