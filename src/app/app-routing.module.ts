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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ProductoComponent } from './Producto/Producto.component';

import { UsuarioComponent } from './Usuario/Usuario.component';
import { SucursalComponent } from './Sucursal/Sucursal.component';

import { PagoComponent } from './Pago/Pago.component';
import { RecargarComponent } from './Recargar/Recargar.component';
import { ReabastecerComponent } from './Reabastecer/Reabastecer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Producto', component: ProductoComponent },
  { path: 'Usuario', component: UsuarioComponent },
  { path: 'Sucursal', component: SucursalComponent },
  { path: 'Pago', component: PagoComponent },
  { path: 'Recargar', component: RecargarComponent },
  { path: 'Reabastecer', component: ReabastecerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
