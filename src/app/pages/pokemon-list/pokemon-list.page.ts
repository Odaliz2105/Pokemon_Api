import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage {
  pokemonName: string = "";
  pokemon : any;
  loading = false;

  constructor(private pokemonService: PokemonService){}

  searchPokemon(){
    if (!this.pokemonName) return;

    this.loading = true;

    this.pokemonService
  .getPokemonDetails(this.pokemonName.toLowerCase())

    .subscribe({
      next: (data:any) => {
        this.pokemon = data;
        this.loading = false;
      },

      error: () =>{
        alert('Pokémon no encontrado')
        this.loading = false;
      }
    });
  }
}