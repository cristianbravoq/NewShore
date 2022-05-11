import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

import { RecruitingApiService } from 'src/app/pages/services/recruiting-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  API_REST : any = [];
  dataArr: any = [];
  unicos: any = [];
  selectedValue!: any;
  selectedValue2!: any;


  constructor(
    private readonly API: RecruitingApiService,
  ) {

    this.inputOrigin.valueChanges.pipe(tap(res => this.origin.emit(res))).subscribe();

    this.API.getInfoAPI().subscribe(
      res => {
        this.API_REST = res; //Guardo la informacion pedida a la API-REST
        this.API_REST.forEach( (res: { departureStation: any; } ) => this.dataArr.push(res.departureStation) );
        this.unicos = this.dataArr.filter((valor: any, indice: any) => {
          return this.dataArr.indexOf(valor) === indice;
        }
      );
      return this.unicos;
      },
      err => console.log(err)
      );

  }

  ngOnInit(): void {
    this.onChange();
  }

  inputOrigin = new FormControl();
  @Output() origin = new EventEmitter<string>(this.selectedValue);

  inputDestination = new FormControl(this.selectedValue2);
  @Output() destination = new EventEmitter<string>();

  onChange(): void {
    this.inputDestination.valueChanges
      .pipe(
        map((search: string) => search.trim()),
        debounceTime(500),
        distinctUntilChanged(),
        filter((search: string) => search !== ''),
        tap((search: string) => this.destination.emit(search)),
      )
      .subscribe()

    this.inputOrigin.valueChanges
      .pipe(
        map((search: string) => search.trim()),
        debounceTime(500),
        distinctUntilChanged(),
        filter((search: string) => search !== ''),
        tap((search: string) => this.origin.emit(search))
      )
      .subscribe()
  }

}
