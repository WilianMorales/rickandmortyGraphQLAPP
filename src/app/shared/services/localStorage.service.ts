import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@shared/interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';


const MY_FAVORITES = 'myFavorites';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private charactersFavSubject = new BehaviorSubject<Character[]>([]);
    charactersFav$ = this.charactersFavSubject.asObservable();

    constructor(private toastSvc: ToastrService) {
        // Llamamos al método de inicializar el storage cuando se inicialice la clase.
        this.initialStorage();
    }

    /**
     * Si el character se encuentra en los favoritos, elimínelo, de lo contrario, agréguelo.
     */
    addOrRemoveFavorite(character: Character): void {
        const {id} = character;
        const currentsFav = this.getFavoritesCharacters();
        const found = !! currentsFav.find((fav: Character) => fav.id === id);
        found ? this.removeFromFavorite(id) : this.addToFavorite(character);
    }

    private addToFavorite(character: Character): void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
            this.charactersFavSubject.next([...currentsFav, character]);
            this.toastSvc.success(`${character.name} added to favorite`, 'RickAndMortyApp');
        } catch (error) {
            this.toastSvc.error(`Error saving localStorage ${error}`, 'RickAndMortyApp');
        }
    }

    private removeFromFavorite(id: number):void {
        try {
            const currentsFav = this.getFavoritesCharacters();
            const newsFav = currentsFav.filter((item: Character) => item.id !== id);

            localStorage.setItem(MY_FAVORITES, JSON.stringify([...newsFav]));
            this.charactersFavSubject.next([...newsFav]);
            this.toastSvc.warning(`Removed from favorite`, 'RickAndMortyApp');
        } catch (error) {
            this.toastSvc.error(`Error removing localStorage ${error}`, 'RickAndMortyApp');
        }
    }

    /**
     * metodo para recuperar los favoritos
     */
    getFavoritesCharacters(): any {
        try {
            const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
            this.charactersFavSubject.next(charactersFav);
            return charactersFav;
        } catch (err) {
            console.log('Error getting from localStorage', err);
        }
    }

    clearStorage(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.log('Error cleaning localStorage', error);
        }
    }

    /**
     * si no existe en localStorage nos crea un array vacio
     */
    private initialStorage(): void {
        const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)!);
        if(!currents) {
            localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
        }

        this.getFavoritesCharacters();
    }
}
