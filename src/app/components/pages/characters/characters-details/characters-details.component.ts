import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interfaces/data.interface';
import { DataService } from '@app/shared/services/data.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-characters-details',
  template: `
  <section class="character__details">
    <app-characters-card *ngIf="character$ | async as character" [character]="character"></app-characters-card>
  </section>`,
  styleUrls: ['./characters-details.component.scss']
})
export class CharactersDetailsComponent implements OnInit {

  character$!: Observable<Character>;

  constructor(private route: ActivatedRoute, private dataSvc: DataService) {
    this.route.params.pipe(
      take(1),
      tap(({ id }) => (this.character$ = this.dataSvc.getDeatails(id)))
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
