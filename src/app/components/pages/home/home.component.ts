import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage.service';

@Component({
  selector: 'app-home',
  template: `
  <section class="character__list">
    <app-characters-card *ngFor="let character of charactersFav$ | async" [character]="character"></app-characters-card>
  </section>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  charactersFav$ = this.localStorageSvc.charactersFav$;
  constructor(private localStorageSvc: LocalStorageService) { }

  ngOnInit(): void {
  }

}
