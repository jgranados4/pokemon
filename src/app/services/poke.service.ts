import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private readonly urlpokemons = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  getLists() {
    return this.http.get(`${this.urlpokemons}?limit=20&offset=0`);
  }
  getPokeData(name: string) {
    return this.http.get(`${this.urlpokemons}/${name}`);
  }
}
