import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import {TarjetaService} from 'src/app/services/tarjeta.service'

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit , OnDestroy {
form: FormGroup
suscription: Subscription;
tarjeta: TarjetaCredito
idTarjeta= 0;

  constructor(private formBuilder: FormBuilder ,private tarjetaService: TarjetaService,
    private toastr: ToastrService) { 



 this.form = this.formBuilder.group({
  id: 0,
  titular: ['',[Validators.required]],
  numeroTarjeta: ['',[Validators.required, Validators.maxLength(16),Validators.minLength(16)]],
  fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
  cw: ['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]

 })


  }

  ngOnInit(): void {
    this.suscription = this.tarjetaService.obtenerTarjeta().subscribe(data=> {
      console.log(data)
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cw: this.tarjeta.cw

      });
      this.idTarjeta = this.tarjeta.id;
    });
    
  }

    ngOnDestroy(){
      this.suscription.unsubscribe();
    }

  guardarTarjeta(){

   if(this.idTarjeta ===0){
  this.agregar();
   } else {
     this.editar()
   }

   
    
  }

  agregar(){

    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cw: this.form.get('cw').value

    }
     this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
       this.toastr.success('Registro agregado', 'la tarjeta fue agregada');
       this.tarjetaService.obtenerClientes();
       this.form.reset()
     });

  }

  editar(){

    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cw: this.form.get('cw').value

    }
    this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data =>{
      this.toastr.info('Registro actualizado','La tarjeta ha sido actualizada');
      this.tarjetaService.obtenerClientes();
      this.form.reset()
      this.idTarjeta =0;
    }
      )

  }

}
