/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductoService } from './Producto.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-producto',
  templateUrl: './Producto.component.html',
  styleUrls: ['./Producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  nombre = new FormControl('', Validators.required);
  precio = new FormControl('', Validators.required);
  cantidad = new FormControl('', Validators.required);
  sucursal = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  tipo = new FormControl('', Validators.required);
  oferta = new FormControl('', Validators.required);

  constructor(public serviceProducto: ProductoService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      nombre: this.nombre,
      precio: this.precio,
      cantidad: this.cantidad,
      sucursal: this.sucursal,
      color: this.color,
      tipo: this.tipo,
      oferta: this.oferta
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProducto.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.usac.tienda.Producto',
      'id': this.id.value,
      'nombre': this.nombre.value,
      'precio': this.precio.value,
      'cantidad': this.cantidad.value,
      'sucursal': this.sucursal.value,
      'color': this.color.value,
      'tipo': this.tipo.value,
      'oferta': this.oferta.value
    };

    this.myForm.setValue({
      'id': null,
      'nombre': null,
      'precio': null,
      'cantidad': null,
      'sucursal': null,
      'color': null,
      'tipo': null,
      'oferta': null
    });

    return this.serviceProducto.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'nombre': null,
        'precio': null,
        'cantidad': null,
        'sucursal': null,
        'color': null,
        'tipo': null,
        'oferta': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.usac.tienda.Producto',
      'nombre': this.nombre.value,
      'precio': this.precio.value,
      'cantidad': this.cantidad.value,
      'sucursal': this.sucursal.value,
      'color': this.color.value,
      'tipo': this.tipo.value,
      'oferta': this.oferta.value
    };

    return this.serviceProducto.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProducto.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProducto.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'nombre': null,
        'precio': null,
        'cantidad': null,
        'sucursal': null,
        'color': null,
        'tipo': null,
        'oferta': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.nombre) {
        formObject.nombre = result.nombre;
      } else {
        formObject.nombre = null;
      }

      if (result.precio) {
        formObject.precio = result.precio;
      } else {
        formObject.precio = null;
      }

      if (result.cantidad) {
        formObject.cantidad = result.cantidad;
      } else {
        formObject.cantidad = null;
      }

      if (result.sucursal) {
        formObject.sucursal = result.sucursal;
      } else {
        formObject.sucursal = null;
      }

      if (result.color) {
        formObject.color = result.color;
      } else {
        formObject.color = null;
      }

      if (result.tipo) {
        formObject.tipo = result.tipo;
      } else {
        formObject.tipo = null;
      }

      if (result.oferta) {
        formObject.oferta = result.oferta;
      } else {
        formObject.oferta = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'nombre': null,
      'precio': null,
      'cantidad': null,
      'sucursal': null,
      'color': null,
      'tipo': null,
      'oferta': null
      });
  }

}
