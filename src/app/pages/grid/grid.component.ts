import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
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
export class GridComponent implements OnDestroy {
  pokeList: WritableSignal<Array<any>> = signal([]);
  public page: WritableSignal<number> = signal<number>(0);
  searchTerm: WritableSignal<string> = signal('');
  //  * Implementacion en el autocomplete
  filterpokemon = computed(() => {
    const term = this.searchTerm();
    const list = this.pokeList();
    if (!term || term.length < 3) {
      // console.log('Termino de busqueda:', term);
      // console.log('Lista de pokemones:', list);
      return list;
    }

    return list.filter((poke) => poke.name.includes(term));
  });
  pokService = inject(PokeService);
  constructor() {
    effect(
      () => {
        const currentPage = this.page();
        this.setdata(currentPage);
      },
      { allowSignalWrites: true }
    );
  }

  setdata(page: number) {
    this.pokService.getLists(page).subscribe((res: any) => {
      this.pokeList.set(res.results);
    });
  }
  //
  nextPage() {
    this.page.update((value) => value + 8);
  }
  prevPage() {
    this.page.update((value) => value - 8);
  }

  inputText(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const events = inputElement.value;
    this.searchTerm.set(events);
  }

  filterCLICK(): void {
    this.pokeList.update((value) => {
      return value.filter((poke: any) => {
        return poke.name.includes(this.filterpokemon()[0].name);
      });
    });
  }
  Clear(input: HTMLInputElement) {
    input.value = '';
    this.setdata(0);
    this.searchTerm.set('');
  }
  ngOnDestroy(): void {
    //destroy the observable subscription to avoid memory leaks
    //desucribirme
  }
}
