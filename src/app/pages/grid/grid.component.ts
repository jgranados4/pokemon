import { Component, inject, signal } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CardComponent } from '../card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MenuComponent, CardComponent, MatGridListModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  pokeList = signal([]);
  pokService = inject(PokeService);
  constructor() {
    this.pokService.getLists().subscribe((res: any) => {
      this.pokeList.set(res.results);
    });
  }
}
