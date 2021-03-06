import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Ruta} from './ruta.model';
import {catchError, map, take} from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class RutaService {
    private rutaCollection: AngularFirestoreCollection<Ruta>;

    constructor(private angularFirestore: AngularFirestore,
                private storage: AngularFireStorage) {}

    getRutasEnIsla(isla: string): Observable<Ruta[]>{
        this.rutaCollection = this.angularFirestore.collection<Ruta>('rutas', ref => {
            return ref.where('isla', '==', isla).orderBy('nombre', 'desc');
        });
        return this.getData();
    }

    getData(){
        return this.rutaCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }

    orderBy(tipo: string, orden: any, isla: string){
        this.rutaCollection = this.angularFirestore.collection<Ruta>('rutas', ref => {
            return ref.where('isla', '==', isla).orderBy(tipo, orden);
        });
        return this.getData();
    }

    getRutaId(id: string): Observable<Ruta> {
        return this.rutaCollection.doc<Ruta>(id).valueChanges().pipe(
            take(1),
            map(lugar => {
                lugar.id = id;
                return lugar;
            })
        );
    }

    addRuta(ruta: Ruta): Promise<DocumentReference> {
        return this.rutaCollection.add(ruta);
    }

    deleteruta(id: string, foto: any): Promise<void> {
        this.storage.storage.refFromURL(foto).delete();
        return this.rutaCollection.doc(id).delete();
    }
}
