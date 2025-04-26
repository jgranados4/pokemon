import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../services/poke.service';
import { IPokemon } from '../../interfaces/pokemon';
import { MatButtonModule } from '@angular/material/button';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  info = input<any>();
  public store = inject(StateService);
  public pokeService = inject(PokeService);
  pokemon = signal<IPokemon | null>(null);
  imageUrl = signal<string>('');
  constructor() {
    effect(
      () => {
        let current = this.info();
        console.log('el valor de current es ', current);
        this.pokeService.getPokeData(current.name).subscribe({
          next: (res: any) => {
            this.pokemon.set(res);
            this.imageUrl.set(
              res.sprites.versions['generation-v']['black-white'].animated
                .front_shiny
            );
          },
          error: (err) => console.error('Error cargando Pokémon', err),
        });
      },
      { allowSignalWrites: true }
    );
  }
}
