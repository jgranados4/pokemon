import { NgOptimizedImage } from '@angular/common';
import {
  Component,
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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, MatButtonModule],
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
    effect(() => {
      // console.log('dadtad', this.data());
    });
  }
  ngOnInit(): void {
    this.pokeService
      .getPokeData(this.info().name)
      .subscribe((res: any | undefined) => {
        this.url.set(
          res.sprites.versions['generation-v']['black-white'].animated
            .front_shiny
        );
        if (res) {
          this.data.set(res);
        }
        // sprites.front_default
      });
  }
  ngOnChanges(): void {
    if (this.info()) {
      this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
        this.url.set(
          res.sprites.versions['generation-v']['black-white'].animated
            .front_shiny
        );
        this.data.set(res);
      });
    }
  }
}
