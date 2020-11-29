import { Component } from '@angular/core';

@Component({//ceci est un décorateur pour définir les propriétés importantes de notre composant.
  selector: 'app-root', // permet de nommer le sélecteur de la sorte : <app-root> pour pouvoir l'instancier/importer dans notre html
  templateUrl: './app.component.html',// définit le template html du composant
  styleUrls: ['./app.component.css']// définit le template css du composant
})
export class AppComponent {
  title = 'Tour of Heroes'; 
  //permet de déterminer la valeur de la propriété title (string) 
  //qui va permettre la liaison d'interpolation d'Angular {{title}} dit : interpolation binding syntax
}
