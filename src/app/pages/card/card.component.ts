import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  info = input<any>();

  url = signal('');

  pokeService = inject(PokeService);

  constructor() {}
  ngOnInit(): void {
    this.pokeService.getPokeData(this.info().name).subscribe((res: any) => {
      console.log(res.sprites.front_default);
      this.url.set(res.sprites.front_default);
    });
  }
}
