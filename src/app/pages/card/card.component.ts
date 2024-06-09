import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
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
  info = input<any>({ name: '' });

  url: WritableSignal<string> = signal<string>('');

  pokeService = inject(PokeService);

  constructor() {}
  ngOnInit(): void {
    this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
      this.url.set(res.sprites.front_default);
      // sprites.front_default
    });
  }
  ngOnChanges(): void {
    console.log('cambio', this.info());
    console.log(' url', this.url());
    if (this.info()) {
      this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
        this.url.set(res.sprites.front_default);
      });
    }
  }
}
