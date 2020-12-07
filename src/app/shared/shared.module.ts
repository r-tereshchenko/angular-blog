import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InputFocusDirective } from './directives/input-focus.directive';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    InputFocusDirective
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    InputFocusDirective,
    QuillModule
  ],
  providers: [
  ]
})

export class SharedModule {}
