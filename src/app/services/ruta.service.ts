import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Ruta} from './ruta.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RutaService {
    private lugares: Observable<Ruta[]>;
    private lugarCollection: AngularFirestoreCollection<Ruta>;

    constructor(private angularFirestore: AngularFirestore) {}

    getRutasEnIsla(isla: string){
        this.lugarCollection = this.angularFirestore.collection<Ruta>('lugares', ref => {
            return ref.where('isla', '==', isla);
        });
        this.lugares = this.lugarCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }
}
