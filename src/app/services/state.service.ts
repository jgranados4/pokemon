import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { PokeService } from './poke.service';
import { IPokemon } from '../interfaces/pokemon';

interface AppState {
  pokeList: Array<any>;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  pokService = inject(PokeService);

  #state = signal<AppState>({
    pokeList: [],
    page: 0,
  });
  //*SIGNAL
  public searchTerm = signal<string>('');

  //* Computed
  readonly pokeList = computed(() => this.#state().pokeList);
  readonly pageMas = computed(() => {
    let newpage = this.#state().page + 10;
    this.loadPage(newpage);
  });
  readonly pageMenos = computed(() => {
    let newpage = this.#state().page - 10;
    if (newpage >= 0) this.loadPage(newpage);
    else this.loadPage(0);
    console.log('el valor de page es ', this.#state().page);
  });
  readonly page = computed(() => this.#state().page);
  readonly filteredPokemon = computed(() => {
    const term = this.searchTerm().toLowerCase();
    console.log('busqueda', term);
    const list = this.#state().pokeList;
    if (!term || term.length < 3) return list;
    return list.filter((poke) => poke.name.includes(term));
  });
  //
  constructor() {
    effect(() => {
      console.log('cambiossss ');
    });
  }
  loadPage(page: number) {
    this.pokService.getLists(page).subscribe({
      next: (res: any) => {
        this.#state.set({
          pokeList: res.results,
          page,
        });
      },
    });
  }

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
  }
}
