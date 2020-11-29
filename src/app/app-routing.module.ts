import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

//importation des composants concernés par le routing afin qu'ils puisse savoir où diriger ses routes.

const routes: Routes = [ //création d'un tableau des routes où l'on va pouvoir définir chaque url
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //path est de type string va assurer la correspondance à l'url
  { path: 'dashboard', component: DashboardComponent }, // 'component' indique le composant que le router va utiliser pour cette route
  { path: 'detail/:id', component: HeroDetailComponent }, // le ":" permet d'indiquer que cette place dans l'url est réserver à une id spécifique d'un héro
  { path: 'heroes', component: HeroesComponent } // ex : à l'url /heroes, le composant HeroesComponent sera crée
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  //méthode forRoot() qui permet d'iniatliser le routeur au niveau de la racine de l'application
  exports: [ RouterModule ]
  //exporte RouterModule qui importe AppRoutingModule
})
export class AppRoutingModule {}