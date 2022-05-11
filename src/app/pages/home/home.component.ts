import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { InputRutesService } from '../services/input-rutes.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  RutesInput: any = {
    departureStation: '',
    arrivalStation: ''
  }

  InputSearch(value: string) {
    this.RutesInput.departureStation = value.toUpperCase();
    this.Rutes.setRute(this.RutesInput);
  }

  InputSearch2(value: string) {
    this.RutesInput.arrivalStation = value.toUpperCase();
  }

  constructor(
    private readonly Rutes: InputRutesService,
    private readonly router: Router
  ) {  }

  ngOnInit(): void {
  }

  findRoutes() {
    this.router.navigate(['/travel']);
  }

}