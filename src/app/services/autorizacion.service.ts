import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AutorizacionService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        alert('Usuario registrado con exito');
        console.log(response);
      })
      .catch((error) => {
        alert('ha ocurrido un error');
        console.log(error);
      });
  }

  public registro = (email, password) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert('Usuario registrado con exito');
        console.log(response);
      })
      .catch((error) => {
        alert('ha ocurrido un error');
        console.log(error);
      });
  }

}
