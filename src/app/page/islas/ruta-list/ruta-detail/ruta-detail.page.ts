import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RutaService} from '../../../../services/ruta.service';
import {Ruta} from '../../../../services/ruta.model';

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
              private rutaService: RutaService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.rutaService.getRutaId(id).subscribe(ruta => {
        this.ruta = ruta;
      });
    }
  }

}
