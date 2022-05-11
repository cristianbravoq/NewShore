import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RecruitingApiService } from '../services/recruiting-api.service'
import { InputRutesService } from '../services/input-rutes.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  auxAPI: any = [];
  auxScale: any  = [];
  aux_coin!: string;
  coin: any = [];
  vacio!: boolean;

  selectedRute : any;

  constructor(
    private readonly router: Router,
    private readonly API: RecruitingApiService,
    private readonly Rutes: InputRutesService
    ) {

      this.vacio = false;
      this.API.getInfoAPI().subscribe(
      res => {
        this.API_REST = res; //Guardo la informacion pedida a la API-REST
      },
      err => console.log(err)
      );

    }


  API_REST : any = [];

  ngOnInit() {

    this.Rutes.selectedRute$.subscribe( data => { this.selectedRute = data })

  }

  rutas() {
    let auxBoolWhile = false;
    this.auxScale.splice(0, 100);
    this.coin = null;
    this.aux_coin = '';

    if (this.selectedRute.departureStation === this.selectedRute.arrivalStation) {
      console.log('Ciudades iguales');
    } else {

      //VUELO DIRECTO SIN ESCALAS
      this.auxAPI.push( this.API_REST.filter( (res: { arrivalStation: string; }) => res.arrivalStation === this.selectedRute.arrivalStation ) );

      this.auxAPI[0].forEach( (res: { arrivalStation: string; departureStation: string; }) => {
        if ( res.arrivalStation === this.selectedRute.arrivalStation && res.departureStation === this.selectedRute.departureStation ){
          auxBoolWhile = true;
          this.auxScale.push( res );
        }
      })

      if (auxBoolWhile === false) {

        //VUELO CON UNA ESCALA
        this.auxAPI.push( this.API_REST.filter( (res: { departureStation: string; }) => res.departureStation === this.selectedRute.departureStation ) );
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
            this.auxAPI.push( this.API_REST.filter( (res: { departureStation: string; }) => res.departureStation === destino.arrivalStation ));
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

  BackHome() {
    this.router.navigate(['/home']);
  }


}
