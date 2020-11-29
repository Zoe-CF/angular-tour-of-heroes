import { Component, OnInit } from '@angular/core'; //importation du composant principal
import { Observable, Subject } from 'rxjs'; //import de la librairie rxjs, elle facilite la gestion des évènement asynchrones par le biais des Observables
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators'; //importe les paramètres pour la recherche depuis la librairie rxjs
 import { Hero } from '../hero'; //importation des modèles
 import { HeroService } from '../hero.service'; // importation pour intéragir avec les services de notre API


@Component({ //ceci est un décorateur pour définir les propriétés importantes de notre composant.
  selector: 'app-hero-search', // permet de nommer le sélecteur de la sorte : <app-hero-search> pour pouvoir l'instancier/importer dans notre html
  templateUrl: './hero-search.component.html', // définit le template html du composant
  styleUrls: [ './hero-search.component.css' ]// définit le template css du composant
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>; //passe la la déclaration des heroes$ comme un Observable
  private searchTerms = new Subject<string>();   //La propriété searchTerms est déclarée comme un RxJS Subject.

  constructor(private heroService: HeroService) {}// constructeur appelé automatiquement à la création du composant 

  // mettre un terme string de recherche dans le flux observable.
  search(term: string): void {
    this.searchTerms.next(term); //appelle ma méthode next(value)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // attend 300ms avant de lancer la recherche
      debounceTime(300),

  
      distinctUntilChanged(), 
      // garantit qu’une requête est envoyée uniquement si le texte du filtre a changé.
      
      // switchMap() appelle le service de recherche pour chaque terme de recherche qui le fait passer par debounce et distinctUntilChanged.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}