import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private readonly urlpokemons = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  getLists(page: number = 0) {
    return this.http
      .get(`${this.urlpokemons}/pokemon`, {
        params: {
          offset: page,
          limit: 10,
        },
      })
      .pipe(
        catchError((error) => {
          console.log('error', error);
          return error;
        })
      );
  }
  getPokeData(name: string) {
    return this.http.get<IPokemon>(`${this.urlpokemons}/pokemon/${name}`).pipe(
      catchError((error) => {
        console.log('error', error);
        return error;
      })
    );
  }
}
