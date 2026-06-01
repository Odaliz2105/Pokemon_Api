<h1 align= "center"> 🔴 PokeApp - Consumo de API con Ionic ⚪ </h1>

## Descripción

Aplicación móvil desarrollada con Ionic y Angular que consume la API de Pokémon (https://pokeapi.co/) para buscar y mostrar información detallada de los Pokémon como:
- Nombre
- ID
- Tipo
- Altura
- Peso
- Habilidades
- Estadísticas de combate

---

## Autora

-Odaliz Balseca Valencia

---

## Tecnologías utilizadas

* Ionic
* Angular
* TypeScript
* Capacitor
* API: https://pokeapi.co/

---

## API utilizada

Se consumió el siguiente endpoint:

https://pokeapi.co/api/v2/pokemon/{nombre}

---

## Funcionalidades

- Buscar Pokémon por nombre
- Mostrar imagen del Pokémon
- Mostrar estadísticas de combate (HP, ataque, defensa, etc)
- Mostrar habilidades
- Splash Screen personalizado
- Ícono personalizado


---

## Proceso de desarrollo

1. Clonación del proyecto del repositorio

   ```bash
   git clone https://github.com/jzaldumbide/pokeapp
   ```

2. Implementación del proyecto:

   ```bash
   npm i
   npm install -D @angular/cli --legacy-peer-deps
   ionic serve
   ```

3. Creación del servicio para consumir la API en 'services/pokemon.service.ts':

    ```ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root',
    })
    export class PokemonService {
      private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    
      constructor(private http: HttpClient) {}
    
      // Obtener detalles de un Pokémon por nombre
      getPokemonDetails(name: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${name.toLowerCase()}`);
      }
    }
    ```

4. Creación de componente para la búsqueda y visualización de los datos del Pokémon en 'pages/pokemon/pokemon-list.page.ts':

   ```ts
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
   ```

5. Creación de la interfaz en 'pages/pokemon/pokemon-list.page.html':

    ```html
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Pokémon</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
    
      <ion-item>
        <ion-label position="fixed">Nombre</ion-label>
        <ion-input 
          placeholder="Ej: pikachu" 
          [(ngModel)]="pokemonName">
        </ion-input>
      </ion-item>
    
      <ion-button 
        expand="block" 
        (click)="searchPokemon()" 
        class="ion-margin-top"
        color = "tertiary">
        Buscar Pokémon
      </ion-button>
    
      <div class="ion-text-center ion-padding" *ngIf="loading">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Buscando...</p>
      </div>
    
      <ion-card *ngIf="pokemon && !loading">
        
        <div class="ion-text-center ion-padding">
          <img 
            [src]="pokemon.sprites.other['official-artwork'].front_default" 
            [alt]="pokemon.name"
            style="width: 200px; height: auto;">
        </div>
    
        <ion-card-header>
          <ion-card-title class="ion-text-center">
            {{ pokemon.name | uppercase }}
          </ion-card-title>
          <ion-card-header class = "ion-text-center">
            ID: {{ pokemon.id}}
          </ion-card-header>
    
        </ion-card-header>
    
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>
                <h2>Tipo</h2>
                <p *ngFor="let tipo of pokemon.types">
                  {{ tipo.type.name | titlecase }}
                </p>
              </ion-label>
            </ion-item>
    
            <ion-item>
              <ion-label>
                <h2>Altura</h2>
                <p>{{ pokemon.height / 10 }} m</p>
              </ion-label>
            </ion-item>
    
            <ion-item>
              <ion-label>
                <h2>Peso</h2>
                <p>{{ pokemon.weight / 10 }} kg</p>
              </ion-label>
            </ion-item>
    
            <ion-item>
              <ion-label>
                <h2>Habilidades</h2>
                <p *ngFor="let habilidad of pokemon.abilities">
                  {{ habilidad.ability.name | titlecase }}
                </p>
              </ion-label>
            </ion-item>
    
            <ion-item lines="none">
              <ion-label>
                <h2>Estadísticas de Combate</h2>
                <p *ngFor="let stat of pokemon.stats">
                  {{ stat.stat.name }}: <strong>{{ stat.base_stat }}</strong>
                </p>
              </ion-label>
            </ion-item>
    
          </ion-list>
        </ion-card-content>
      </ion-card>
    
    </ion-content>
    
    ```

## Implementación de ícono y splash screen

### Ícono

1. Crear una carpeta denominada: ```resources/```
2. Desacarga de ícono de 1024 x 1024 pixeles con nombre: ```icon.png``` y guardar en la carpeta resources
3. Instalar herramienta:

    ```bash
    npm install @capacitor/assets
    ``` 

4. Generar la carpeta para Android:
    ```bash
    ionic build
    ionic cap add android
    npx cap sync android
    ```

5. Generar el ícono para la aplicación:
    
    ```bash
    npx capacitor-assets generate
    ```


### Splash Screen

Dentro de la ruta ```android/app/src/main/res/values/```

1. En el archivo ```styles.xml``` agregar:

    ```xml
    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">

    <item name="windowSplashScreenBackground">@color/splash_background</item>

    <item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item>

    <item name="windowSplashScreenIconBackgroundColor">@color/splash_background</item>

    <item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>

    </style>
    ```
- Se utilizó el ícono de la aplicación como elemento del Splash Screen para compatibilidad con Android 12+.


2. Crear un archivo denominado ```colors.xml``` y agregar:

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <color name="splash_background">#FFFFFF</color>
        <color name="ic_launcher_background">#FFFFFF</color>
    </resources>
    ```

4. Volver asincronizar el proyecto con:
    ```bash
    npx cap sync android
    ```

---

## Ejecución en dispositivo

1. Para ejecutar la aplicación:

    ```bash
    npx cap open android
    ```

2. Para obtener la apk:


<img width="680" height="283" alt="image" src="https://github.com/user-attachments/assets/d6ec1fab-4659-4431-807c-efab567dd40f" />

## Descargar APK

[![Descargar APK](https://img.shields.io/badge/Descargar-APK-green?style=for-the-badge&logo=android)](https://drive.google.com/drive/folders/12LQ-qay4l-YOou74a8nqLToV82hItvrk?usp=sharing)

---


## Capturas de la funcionalidad

| Splash Screen | Ícono |
|---------------|-------|
| <img width="200" src="https://github.com/user-attachments/assets/dbfb0f6c-8ca7-4d04-a10b-3b995e8cdf92" /> | <img width="200" src="https://github.com/user-attachments/assets/da5d2c02-d522-43a1-9969-bc85e7108fa5" /> |
| Búsqueda de Pokémon | Resultado |
| <img width="200" src="https://github.com/user-attachments/assets/ab98882a-27a7-46df-bafa-26a4783ab341" /> | <img width="200" src="https://github.com/user-attachments/assets/6c1c0642-41a7-4e87-ab79-da4323b733c0" />|


### App en ejecución en celular


https://github.com/user-attachments/assets/a970699a-0a34-4d29-9fc7-34faa81abb78


---

## Resultados

- Se consumió correctamente la API de Pokémon.
- APK de la aplicación funcional.
- Ícono y Splash Screen personalizados.
- Interfaz sencilla y amigable
