import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CardComponent } from '../card/card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokeService } from '../../services/poke.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    MenuComponent,
    CardComponent,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent implements OnInit {
  pokeList: WritableSignal<Array<any>> = signal([]);
  public page: WritableSignal<number> = signal<number>(0);
  filterpokemon: WritableSignal<any[]> = signal<any>([]);
  pokService = inject(PokeService);
  constructor() {
    effect(
      () => {
        console.log('el valor de filter es ', this.filterpokemon());
      },
      { allowSignalWrites: true }
    );
  }
  ngOnInit() {
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
    this.setdata();
  }
  prevPage() {
    this.page.update((value) => value - 8);
    this.setdata();
  }

  inputText(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const events = inputElement.value;
    if (events.length > 2) {
      this.filterpokemon.set(
        this.pokeList().filter((poke) => poke.name.includes(events))
      );
    } else {
      this.filterpokemon.set(this.pokeList());
    }
  }

  filterCLICK(): void {
    this.pokeList.update((value) => {
      return value.filter((poke: any) => {
        return poke.name.includes(this.filterpokemon()[0].name);
      });
    });
    setTimeout(() => {
      this.setdata();
    }, 1000);
  }
  Clear() {
    this.setdata();
  }
}
