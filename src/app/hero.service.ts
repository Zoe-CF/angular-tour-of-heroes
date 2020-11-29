import { Injectable } from '@angular/core'; //import auto à la création du Service car la classe HeroService va fournir un service dit injactable
import { HttpClient, HttpHeaders } from '@angular/common/http'; //import pour communiquer avec le backend de l'API

import { Observable, of } from 'rxjs'; //import de la librairie rxjs, elle facilite la gestion des évènement asynchrones par le biais des Observables
import { catchError, map, tap } from 'rxjs/operators'; //va permettre d'identifier et retourner les erreurs 

import { Hero } from './hero'; //importation des modèles
import { MessageService } from './message.service';//importation pour intéragir avec les services de notre API


@Injectable({ providedIn: 'root' }) //déclare le service au niveau de la racine de l'API
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL pour l'API Web

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Obtenir des héros depuis le serveur */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** Obtenir un hero par son id. Retourne `undefined` si il n'est pas trouvé */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // initialise la première valeur d'entrée de tableau
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** Obtenir le héro par son id, retourner une erreur 404 si non trouvé */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* Obtenir un héro par la méthode searchHeroes via les lettres des noms*/
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // Si il n'y a pas de correspondance, renvoyer un array vide
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save méthodes //////////

  /** POST: ajouter un nouveau héro au serveur */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: supprimer un héro du serveur */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: MAJ un héro déjà présent sur le serveur */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Manipulation à faire si échec des instructions Http 
   * Llaisser l'API continuer
   * @param operation - nom de l'opération qui a échoué 
   * @param result - valeur optionnelle pour retourner le résultat de l'observable en cause
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: affiche l'erreur dans le terminal  
      console.error(error); // 
      
      // TODO: meilleur rendu de transformation de l'erreur pour le retour utilisateur
      this.log(`${operation} failed: ${error.message}`);

      // Laissez l'application continuer à fonctionner en renvoyant un résultat vide.
      return of(result as T);
    };
  }

  /** Log du HeroService message par le biais du MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}