import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Lugar } from '../lugares/lugar';
import { Lugares } from '../lugares/lugares.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LugaresService {
  LugarList : Lugar[];
  API_ENDPOINT = 'https://platzisquare-1525156027856.firebaseio.com';
  
  constructor(private afDB:AngularFireDatabase, private http: HttpClient ) { }

  lugares:any = [
    {id: 1, plan: 'pagado' , cercania: 1, distancia: 1, active: true, nombre: 'Floreria de la Gardenia', descripcion: 'Esto es una descripcion.'},
    {id: 2, plan: 'gratuito' , cercania: 1, distancia: 1.8, active: false, nombre: 'Donas la pasadita', descripcion: 'Esto es una descripcion.'},
    {id: 3, plan: 'gratuito' , cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria huellitas felices', descripcion: 'Esto es una descripcion.'},
    {id: 4, plan: 'pagado' , cercania: 3, distancia: 10, active: false, nombre: 'Floreria de la Gardenia', descripcion: 'Esto es una descripcion.'},
    {id: 5, plan: 'pagado' , cercania: 3, distancia: 35, active: true,nombre: 'Donas la pasadita', descripcion: 'Esto es una descripcion.'},
    {id: 6, plan: 'gratuito' , cercania: 3, distancia: 120, active: true, nombre: 'Veterinaria huellitas felices', descripcion: 'Esto es una descripcion.'}
  ];

  public getLugares(){
    //return this.afDB.list('lugares/'); 
    //return this.http.get(this.API_ENDPOINT + '/lugares.json')
    return this.http.get(this.API_ENDPOINT + '/.json')
            .map((result: Lugares) => {
              const data = result.      lugares;              
              return data;
              //return data;
            });    
  }

  public buscarLugar(id){   
    return this.lugares.find((lugar) => {return lugar.id == id}) || null;
  }

  public guardarLugar(lugar){    
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);    
  }

  /*public guardarLugar(lugar: Lugar): Observable<any>{
    let json = JSON.stringify(lugar);
    let params = "json="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');     
    return this.http.post('https://platzisquare-1525156027856.firebaseio.com/lugares.json', lugar, {headers: headers});
  }*/

  /*addHero (hero: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.API_ENDPOINT, hero, httpOptions).pipe(
      tap((hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Lugar>('addHero'))
    );
  }*/

  public editarLugar(lugar){    
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }

  public obternGeoData(direccion){
    // var strUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCAAr5wauCCmh8yWXd1F83CKoXkPWRehDM&address='+ direccion;
    // alert(strUrl);
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCAAr5wauCCmh8yWXd1F83CKoXkPWRehDM&address='+ direccion);
  }

  public getLugar(id){
    return this.afDB.object('lugares/'+ id);
  }

}
