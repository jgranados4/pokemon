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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';

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
  //  * Implementacion en el autocomplete

  public store = inject(StateService);
  filteredPokemon = computed(() => this.store.filteredPokemon());
  constructor() {
    effect(
      () => {
        const currentPage = this.store.page();
        this.store.loadPage(currentPage);
      },
      { allowSignalWrites: true }
    );
  }

  //
  nextPage() {
    this.store.pageMas();
  }
  prevPage() {
    this.store.pageMenos();
  }

  inputText(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const events = inputElement.value;
    this.store.updateSearchTerm(events);
  }

  Clear(input: HTMLInputElement) {
    input.value = '';
    this.store.loadPage(0);
    this.store.searchTerm.set('');
  }
  pokemonSelected(nombre: string) {
    this.store.updateSearchTerm(nombre);
  }
  ngOnDestroy(): void {
    //destroy the observable subscription to avoid memory leaks
    //desucribirme
  }
}
