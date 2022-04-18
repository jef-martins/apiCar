import { MotorsInterface } from './../models/motors.models';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class MotorsSservice{

  constructor (private httpClient: HttpClient) {

  }

  exibir(){
    return this.httpClient.get('http://localhost:8081')
  };

  busca(car){
    console.log(car)

    return this.httpClient.get(`http://localhost:8081/${car}`)
  };

  cadastrar(car: any){
    this.httpClient.post('http://localhost:8081', car)
    .subscribe((valor) => {
      console.log(valor)
    })
  }

  apagar(id:any){
    return this.httpClient.delete(`http://localhost:8081/${id}`)
    .subscribe((valor) => {
    })
  }

  editar(car){
    return this.httpClient.put('http://localhost:8081/'+car.id, car)
    .subscribe((x)=>{})

  }
}
