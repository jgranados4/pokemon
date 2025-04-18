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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  info = input<any>([]);
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
  infor = computed(() => this.info());

  constructor() {
    console.log('el valor de info es ', this.infor());
    effect(
      () => {
        let current = this.infor();
        console.log('el valor de current es ', current);
        if (current && current.name) {
          this.pokeService.getPokeData(current.name).subscribe({
            next: (res: any) => {
              this.url.set(
                res.sprites.versions['generation-v']['black-white'].animated
                  .front_shiny
              );
              this.data.set(res);
            },
          });
        }
        // console.log('el valor de data es ', this.data());
      },
      { allowSignalWrites: true }
    );
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
}
