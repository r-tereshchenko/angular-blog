import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuillModule } from 'ngx-quill';

import { InputFocusDirective } from './directives/input-focus.directive';
import { AuthService } from '../admin/shared/services/auth.service';

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
    AuthService
  ]
})

export class SharedModule {}
