import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList) lista : IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
    private router: Router,
    private alertCrl: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }


  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }

  async editarlista(lista: Lista) {
    console.log(lista);

    const modal = await this.alertCrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Modificar',
        handler: (data) => {
          console.log(data);
          if (data.titulo.length === 0) {
            return;
          }

          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();


        }
      }]


    });
    modal.present();

  }

}



