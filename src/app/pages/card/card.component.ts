import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../services/poke.service';
import { IPokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  info = input<any>({});
  data = signal<IPokemon>({
    abilities: [],
    base_experience: 0,
    cries: [],
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_abilities: [],
    past_types: [],
    species: [],
    sprites: [],
    stats: [],
    types: [],
    weight: 0,
  });

  url: WritableSignal<string> = signal<string>('');

  pokeService = inject(PokeService);

  constructor() {
    effect(() => {});
  }
  ngOnInit(): void {
    this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
      this.url.set(res.sprites.front_default);
      this.data.set(res);
      console.log(res);

      // sprites.front_default
    });
  }
  ngOnChanges(): void {
    if (this.info()) {
      this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
        this.url.set(res.sprites.front_default);
        this.data.set(res);
      });
    }
  }
}
