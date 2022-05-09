import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { RecruitingApi } from '../services/recruiting-api.service'

import { Observable, tap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  auxAPI: any = [];
  auxScale: any  = [];
  departureStation!: string;
  arrivalStation!: string;
  aux_coin!: string;
  coin: any = [];
  vacio!: boolean;

  handleSearch(value: string) {
    //Valor que se escribe en el input
    this.departureStation = value;
  }

  handleSearch2(value: string) {
    //Valor que se escribe en el input
    this.arrivalStation = value;
  }

  constructor(
    private readonly router: Router,
    private readonly API: RecruitingApi
  ) { }

  API_REST : any = [];

  ngOnInit() {
    this.vacio = false;
    this.API.getInfoAPI().subscribe(
      res => {
        this.API_REST = res; //Guardo la informacion pedida a la API-REST
        console.log(this.API_REST, 'Peticion en el homecomponent');
      },
      err => console.log(err)
    );
  }

  async findRoutes() {
    let auxBoolWhile = false;
    this.auxScale.splice(0, 10);
    this.coin = null;
    this.aux_coin = '';

    if (this.departureStation.toUpperCase() === this.arrivalStation.toUpperCase()) {

    } else {

      //VUELO DIRECTO SIN ESCALAS
      this.auxAPI.push( this.API_REST.filter( (res: { arrivalStation: string; }) => res.arrivalStation === this.arrivalStation.toUpperCase() ) );

      this.auxAPI[0].forEach( (res: { arrivalStation: string; departureStation: string; }) => {
        if ( res.arrivalStation === this.arrivalStation.toUpperCase() && res.departureStation === this.departureStation.toUpperCase() ){
          auxBoolWhile = true;
          this.auxScale.push( res );
        }
      })

      if (auxBoolWhile === false) {

        //VUELO CON UNA ESCALA
        this.auxAPI.push( this.API_REST.filter( (res: { departureStation: string; }) => res.departureStation === this.departureStation.toUpperCase() ) );
        console.log(this.auxAPI);
        this.auxAPI[0].forEach( (destino: { arrivalStation: string , departureStation: string; }) => {
          this.auxAPI[1].forEach( (origen: { arrivalStation: string , departureStation: string; }) => {
            if (destino.departureStation === origen.arrivalStation ) {
                        this.auxScale.push( origen, destino );
                        auxBoolWhile = true;
            }
          } )
        } )

      }

      if (auxBoolWhile === false) {

        let auxNivelEscala: number = 2;

        do {

          this.auxAPI[auxNivelEscala-1].forEach( (destino: { arrivalStation: string; }) => {
            this.auxAPI.push( this.API_REST.filter( (res: { departureStation: string; }) => res.departureStation === destino.arrivalStation ) );
          } )

          this.auxAPI[0].forEach( (destino: { arrivalStation: string , departureStation: string; }) => {
            this.auxAPI[auxNivelEscala].forEach( (origen: { arrivalStation: string , departureStation: string; }) => {
              if (destino.departureStation === origen.arrivalStation ) {
                this.auxScale.push( origen, destino );
                let respuesta = this.auxAPI[1].filter ( (res: { arrivalStation: string; }) => res.arrivalStation === origen.departureStation);
                this.auxScale.unshift ( respuesta[0] );
                this.auxScale = this.auxScale.filter((item: any,index: any)=>{
                  return this.auxScale.indexOf(item) === index;
                })
                auxBoolWhile = true;
              }
            } )
          } )
          auxNivelEscala = auxNivelEscala + 1;
          console.log(auxNivelEscala);

        } while (auxNivelEscala < 4);
      }
    }
    this.auxAPI.splice(0, this.auxAPI.length);
    this.vacio = true;
    return this.auxScale, this.vacio;
  }

  totalCoin() {
    this.coin = [];
    let pricecoin = 0;
    for (let i = 0; i < this.auxScale.length; i++) {
      this.coin.push(this.auxScale[i].price);
    }
    this.coin = JSON.stringify(this.coin);
    let data = JSON.parse(this.coin);
    // //Recorriendo el objeto
    for(let i = 0; i < this.auxScale.length; i++){
      pricecoin += data[i];
    }
    this.coin = pricecoin;
    return this.coin;
  }

  coinUSD() {
    this.aux_coin = 'USD';
    this.coin = this.totalCoin();
  }
  coinGBP() {
    this.aux_coin = 'GBP';
    this.coin = this.totalCoin() * 0.78;
  }
  coinEUR() {
    this.aux_coin = 'EUR';
    this.coin = this.totalCoin() * 0.93;
  }

}