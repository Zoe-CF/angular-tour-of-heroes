import { Component, OnInit } from '@angular/core';//importation du composant principal
import { ActivatedRoute } from '@angular/router'; // importation des routes
import { Location } from '@angular/common'; // import de 'location' qui va permettre de renvoyer l'utilisateur à sa nav' précédente

import { Hero } from '../hero';//importation des modèles
import { HeroService } from '../hero.service';// importation pour intéragir avec les services de notre API

@Component({//ceci est un décorateur pour définir les propriétés importantes de notre composant.
  selector: 'app-hero-detail', // permet de nommer le sélecteur de la sorte : <app-hero-details> pour pouvoir l'instancier/importer dans notre html
  templateUrl: './hero-detail.component.html',// définit le template html du composant
  styleUrls: [ './hero-detail.component.css' ]// définit le template css du composant
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(// constructeur appelé automatiquement à la création du composant 
    private route: ActivatedRoute,//fournit un accès aux observable url, params etc.. / permet à l'utilisateur de modifier l'url ex via "id"
    private heroService: HeroService,//"HeroService" permet de récupérer la liste des héros à afficher dans le composant lié à l'import ligne 
    private location: Location //va faire le call pour la navigation précédente
  ) {}

  ngOnInit(): void {//void = ne retourne rien mais MAJ la variable
    this.getHero();// fonction qui permet d'obtenir les héros qu'on inilise dans le OnInit donc au lancement du composant hero-details
  }

  getHero(): void { //méthode pour récupérer un seul héro par son id :
    const id = +this.route.snapshot.paramMap.get('id');//snapshot revient les paramètres de l'URL et prend le paramètre 'id' pour la variable 'id'
    this.heroService.getHero(id) // la const id définit au dessus devient le paramètre de hero.Service
      .subscribe(hero => this.hero = hero);//subscribe va souscrire à un Observable pour une approche asynchrone lorsque que HeroService demande des héros au serveur
      //maintenant l'on peut récupérer un héro via son identifiant URL et l'utiliser pour récupérer le héro concerné
  }

  goBack(): void { //méthode pour revenir en arrière
    this.location.back(); //utilisation de "location" relié à back, goBack() est prête
  }

  save(): void { //méthode save pour sauvegarder les modification de nom de héros 
    this.heroService.updateHero(this.hero) // la méthode save() suivante, qui conserve les modifications de nom de héros en utilisant la méthode updateHero() du service hero
      .subscribe(() => this.goBack()); // puis elle revient à la vue précédente
  }
}