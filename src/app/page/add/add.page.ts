import { Component, OnInit } from '@angular/core';
import {Ruta} from '../../services/ruta.model';
import {ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {RutaService} from '../../services/ruta.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {


  task: AngularFireUploadTask;
  urlFoto = '';
  // Progress in percentage
  percentage: Observable<number>;

  // Snapshot of uploading file
  snapshot: Observable<any>;

  // Uploaded File URL
  UploadedFileURL: Observable<string>;

  // Uploaded Image List
  images: Observable<MyData[]>;

  // File details
  fileName:string;
  fileSize:number;

  // Status check
  isUploading:boolean;
  isUploaded:boolean;
  path = '';
  private imageCollection: AngularFirestoreCollection<MyData>;

  isla: string = this.activatedRoute.snapshot.paramMap.get('isla');

  ruta: Ruta = {
    dificultad: '',
    isla: this.isla,
    nombre: '',
    urlFoto: ''
  };

  constructor(
      private activatedRoute: ActivatedRoute,
      private toastCtrl: ToastController,
      private router: Router,
      private rutaService: RutaService,
      private storage: AngularFireStorage,
      private database: AngularFirestore) {
    this.isUploading = false;
    this.isUploaded = false;
    this.imageCollection = database.collection<MyData>('imagenes');
    this.images = this.imageCollection.valueChanges();
  }
  ngOnInit() {
  }

  addRuta() {
    const url = '/home/' + this.isla;
    this.ruta.urlFoto = this.urlFoto;
    this.rutaService.addRuta(this.ruta).then(() => {
      this.router.navigateByUrl(url).then((e) => {
        if (e) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
        return false;
      });
      this.showToast('Ruta añadida');
    }, () => {
      this.showToast('There was a problem adding your lugar =(');
    });
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  uploadFile(event: FileList) {


    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    this.path = `imagenes/${new Date().getTime()}_${file.name}`;
    console.log(this.path);
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };

    //File reference
    const fileRef = this.storage.ref(this.path);

    // The main task
    this.task = this.storage.upload(this.path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

        finalize(() => {
          // Get uploaded file storage path
          console.log(fileRef.getDownloadURL());
          this.UploadedFileURL = fileRef.getDownloadURL();
          console.log(this.UploadedFileURL);
          this.UploadedFileURL.subscribe(resp => {
            this.urlFoto = resp;
            console.log(resp);
            console.log(this.urlFoto);
            this.addImagetoDB({
              name: file.name,
              filepath: resp,
              size: this.fileSize
            });
            this.isUploading = false;
            this.isUploaded = true;
          }, error => {
            console.error(error);
          });
        }),
        tap(snap => {
          this.fileSize = snap.totalBytes;
        })
    );
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log( 'error ' + error);
    });
  }

}
