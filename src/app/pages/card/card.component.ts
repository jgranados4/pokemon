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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit, OnChanges {
  info = input<any>({});
  data = model<any>({});

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
