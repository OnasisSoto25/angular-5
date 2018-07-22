import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { Lugares } from './lugares.interface';
import { trigger, state, style, transition, animate} from "@angular/animations"

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css'],
  animations:[
    trigger(
      'contenedorAnimable', [
        state('inicial', style({
          opacity: 0          
        })),
        state('final', style({
          opacity: 1          
        })), transition('inicial => final', animate(2000)),
             transition('final => inicial', animate(1000))
      ]
    )
  ]
})
export class LugaresComponent implements OnInit {

  title = 'PlatziSquare';  
  lat:number = -2.1277028;
  lng:number = -79.9088858;
  lugares = null;
  state = 'inicial';

  constructor(private lugaresService: LugaresService) { 
      //lugaresService.getLugares().valueChanges().subscribe(lugares => {
        lugaresService.getLugares().subscribe((lugares) => {  
          //console.log(lugares);
          this.lugares = lugares;
          var me = this;
          this.lugares = Object.keys(me.lugares).map((key) => me.lugares[key]);  
          this.state = 'final';        
      }, error => {
        console.log('aqui hubo un error');        
      });    
  }

  animar(){
    this.state = (this.state === 'final') ? 'inicial' : 'final';
  }

  animacionInicia(e){
    console.log(e);
    console.log('iniciado');
  }

  animacionTermina(e){
    console.log('Terminado');
    console.log(e);
  }

  ngOnInit() {
  }
  
}
