import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaService} from '../../../services/ruta.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ruta} from '../../../services/ruta.model';
import {AuthenticateService} from '../../../services/authenntication.service';

@Component({
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.page.html',
  styleUrls: ['./ruta-list.page.scss'],
})
export class RutaListPage implements OnInit {

  searchTerm: any = '';
  searchText: any = '';
  ordenar = 'nombre';
  asc = 'asc';
  mostrar = true;
  isla: string = this.activatedRoute.snapshot.paramMap.get('isla');
  private rutas: Observable<Ruta[]>;
  private rutas2: Observable<Ruta[]>;
  constructor(private activatedRoute: ActivatedRoute,
              private rutaService: RutaService,
              private router: Router,
              private authSvc: AuthenticateService) {

  }

  ngOnInit() {
    if (this.isla){
      this.rutas = this.rutaService.getRutasEnIsla(this.isla);
      this.rutas2 = this.rutas;
      console.log(this.ordenar);
      console.log(this.asc);
    }
  }

  ordenarRutas(){
    this.rutas = this.rutaService.orderBy(this.ordenar, this.asc, this.isla);
    this.search();
  }

  cambiarAsc(tipo: string){
    this.asc = tipo;
    this.ordenarRutas();
    this.mostrar = !this.mostrar;
  }

  userConnect() {
    return this.authSvc.isLogged;
  }

  search(){
    this.searchText = '';
    if (this.searchTerm != null) {
      this.searchText = this.searchTerm.toLowerCase();
      console.log(this.searchText);
    } else {
      this.searchText = '';
    }

    this.rutas = this.rutas.pipe(
        map((reports: any[]) => reports.filter(p => {
          if (p.nombre.toString().toLowerCase().indexOf(this.searchText) > -1) {return p; }
        }))
    );
  }

}
