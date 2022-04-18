import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MotorsSservice } from "./services/motors.service";

@Injectable ({
  providedIn: 'root'
})

export class MotorsFacade {

  constructor(
    private motorsService: MotorsSservice,
    private router: Router
    ){}

  carros() {
    return this.motorsService.exibir()
  }

  buscarCarro(car){
    return this.motorsService.busca(car)
  }

  cadastro(car: any){
    this.motorsService.cadastrar(car)
  }

  apagar(car: any){
    this.motorsService.apagar(car.id)
  }

  atualizar(car){
    this.motorsService.editar(car)
  }
}
