import { Component, OnInit } from '@angular/core'; //importation du composant principal
import { Hero } from '../hero'; //importation des modèles
import { HeroService } from '../hero.service'; // importation pour intéragir avec les services de notre API

@Component({ //ceci est un décorateur pour définir les propriétés importantes de notre composant.
  selector: 'app-dashboard', // permet de nommer le sélecteur de la sorte : <app-dashboard> pour pouvoir l'instancier/importer dans notre html
  templateUrl: './dashboard.component.html', // définit le template html du composant
  styleUrls: [ './dashboard.component.css' ]// définit le template css du composant
})
export class DashboardComponent implements OnInit { //la classe du composant qui implémente l'interface OnInit pour définir une méthode qui sera exécuté lors de l'inialisation du composant
  heroes: Hero[] = []; // déclaration de la variable heroes, créer un array vide (tableaux pour y ranger les héros) grace à Typescript

  constructor(private heroService: HeroService) { } // constructeur appelé automatiquement à la création du composant 
  //"HeroService" permet de récupérer la liste des héros à afficher dans le composant lié à l'import ligne 3 
  //"private" permet de définir le constructeur qui sera uniquement dans cette classe

  ngOnInit() {
    this.getHeroes(); // fonction qui permet d'obtenir les héros qu'on inilise dans le OnInit donc au lancement du composant dashboard
  }

  getHeroes(): void { //void = ne retourne rien mais MAJ la variable
    this.heroService.getHeroes() //méthode get qui renvoie la liste des héros
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); //  "subscribe" permet d'être informé des données qui viennent de parvenir à l'application.
      //heroes => permet de récupérer la liste des héros pour la mettre dans l'array ligne 11 => injection de dépendance via "heroService" pour récupérer les héros
      // le slice(1,5) permets de récupérer 4 héros de la liste de notre tableau
  }
}