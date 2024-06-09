import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CardComponent } from '../card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    MenuComponent,
    CardComponent,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  pokeList: WritableSignal<Array<any>> = signal([]);
  public page: WritableSignal<number> = signal<number>(0);
  pokService = inject(PokeService);
  constructor() {
    this.setdata();
  }
  setdata() {
    this.pokService.getLists(this.page()).subscribe((res: any) => {
      this.pokeList.set(res.results);
    });
  }
  //
  nextPage() {
    this.page.update((value) => value + 8);
    console.log('el signal es ', this.page());
    this.setdata();
  }
  prevPage() {
    this.page.update((value) => value - 8);
    console.log('el signal es ', this.page());
    this.setdata();
  }
}
