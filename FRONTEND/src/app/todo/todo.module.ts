import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
