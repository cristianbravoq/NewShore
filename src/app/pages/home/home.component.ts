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

  RutesInput = {
    departureStation: '',
    arrivalStation: ''
  }

  handleSearch(value: string) {
    this.RutesInput.departureStation = value.toUpperCase();
    this.Rutes.setRute(this.RutesInput)
  }

  handleSearch2(value: string) {
    this.RutesInput.arrivalStation = value.toUpperCase();
  }

  constructor(
    private readonly Rutes: InputRutesService,
    private readonly router: Router
  ) {
    // this.Rutes.selectedRute$.subscribe(rute => this.RutesInput)
   }

  ngOnInit(): void {
  }

  findRoutes() {
    this.router.navigate(['/travel']);
  }

}