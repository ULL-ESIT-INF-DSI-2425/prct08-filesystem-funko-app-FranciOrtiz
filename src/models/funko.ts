/**
 * Enumerados para tipo y género de Funko
 *  */ 
export enum FunkoType {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    VinylSoda = "Vynil Soda",
    VinylGold = "Vynil Gold"
  }
/**
 * Enumeración de los géneros de Funkos
 */
export enum FunkoGenre {
    Animation = "Animación",
    MoviesTV = "Películas y TV",
    VideoGames = "Videojuegos",
    Sports = "Deportes",
    Music = "Música",
    Anime = "Ánime"
  }
  
/**
 * Interfaz Funko
 */
export interface Funko {
    id: number;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    number: number;
    exclusive: boolean;
    specialFeatures: string;
    marketValue: number;
  }