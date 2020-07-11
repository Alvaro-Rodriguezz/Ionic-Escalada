import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Islas} from './islas.model';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class IslasService {
    private islas: Observable<Islas[]>;
    private islasCollection: AngularFirestoreCollection<Islas>;
    constructor(private angularFirestore: AngularFirestore) {
        this.islasCollection = this.angularFirestore.collection<Islas>('islas');
        this.islas = this.islasCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }

    getIslas(){
        return this.islas;
    }
}
