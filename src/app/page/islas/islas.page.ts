import { Component, OnInit } from '@angular/core';
import {IslasService} from '../../services/islas.service';
import {Observable} from 'rxjs';
import {Islas} from '../../services/islas.model';

@Component({
  selector: 'app-islas',
  templateUrl: './islas.page.html',
  styleUrls: ['./islas.page.scss'],
})
export class IslasPage implements OnInit {

  private islas: Observable<Islas[]>
  constructor(private islasSservice: IslasService) { }

  ngOnInit() {
    this.islas = this.islasSservice.getIslas();
  }

}
