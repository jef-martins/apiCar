import { Router } from '@angular/router';
import { MOTORS } from './../models/motors.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MotorsFacade } from '../motors-facade';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  public car

  public lista: any;
  public motors: any;

  public cadastroForm: FormGroup;

  private router: Router
  public edit: boolean = false;

  @Output() aoClicar = new EventEmitter();

  constructor(
    private motorsFacade: MotorsFacade,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formCadastro();
    this.listaCarros();
  }

  listaCarros(){
    const lista = this.motorsFacade.carros()
      .subscribe((car) => {
        this.lista = car
    })
  }

  buscar(car){
    if (!car) {
      this.listaCarros();
      return;
    };
    const lista = this.motorsFacade.buscarCarro(car)
      .subscribe((car) => {
        this.lista = [car]

    })
  }

  formCadastro(){
    this.cadastroForm = this.fb.group({
      id: [null],
      placa: ['', [Validators.required]],
      chassi: ['', [Validators.required]],
      renavam: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      ano: ['', [Validators.required]],
    })
  }

  cadastro(){
    console.log(this.cadastroForm)
    this.motorsFacade.cadastro(this.cadastroForm.value)
      this.limpar();
      this.listaCarros()
  }

  aoEditar(car) {
    this.edit = true;
    this.cadastroForm = this.fb.group ({
      id:[car.id],
      placa: [car.placa],
      chassi: [car.chassi],
      renavam: [car.renavam],
      modelo: [car.modelo],
      marca: [car.marca],
      ano: [car.ano],
    })
  }

  apagar(car){
    this.motorsFacade.apagar(car);
  }

  limpar(){
    this.cadastroForm.setValue(MOTORS)
  }

  editar(){
    this.motorsFacade.atualizar(this.cadastroForm.value);
    this.limpar();
  }

}
