import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-lis-tarjeta-credito',
  templateUrl: './lis-tarjeta-credito.component.html',
  styleUrls: ['./lis-tarjeta-credito.component.css']
})
export class LisTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService, 
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerClientes();
  }

  eliminarTarjeta(id: number){
 
  if(confirm('Esta seguro que desea eliminar el registro ?')){
    this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
      this.toastr.warning('Registro eliminado ', 'Cliente fue eliminada')
      this.tarjetaService.obtenerClientes();
    })
  }

  }

  editar(tarjeta){
    this.tarjetaService.actualizarCliente(tarjeta);
  }

}
