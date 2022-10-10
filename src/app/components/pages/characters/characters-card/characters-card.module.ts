import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CharactersCardComponent } from './characters-card.component';

@NgModule({
  declarations: [
    CharactersCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CharactersCardComponent
  ]
})
export class CharactersCardModule { }
