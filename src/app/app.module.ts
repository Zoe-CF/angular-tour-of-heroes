import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//importation du module indispensable pour NgModel à rajouter dans le @NgModule
import { HttpClientModule } from '@angular/common/http';
//permet de recevoir des réponses di httpClient
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
//importation du module permettant la communication avec un serveur distant
import { AppRoutingModule } from './app-routing.module';
//importation du module de routing pour nos urls
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
//importation des composants qui vont interférer dans notre application

@NgModule({ // leNgModule sert à enregistrer tout ce que nous créons dans Angular afin de les regrouper ensemble
  imports: [ //on importe dans le NgModule les modules indispensable à son utilisation
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module qui intercepte les requêtes HTTP 
    // et simule un retour de type réponse depuis le serveur.
    // Partie à enlever quand le serveur sera prêt.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [ // les déclarations servent pour tout ce que nous allons utiliser dans nos template, principalement les composants
   // mais aussi des directives et les pipes.
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent],

  bootstrap: [ AppComponent ] //définit AppComponent comme le composant utilisé au démarrage, par défaut donc
})
export class AppModule { }