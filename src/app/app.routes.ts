import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { CharactersComponent } from './components/characters/characters.component';
import { PotionsComponent } from './components/potions/potions.component';
import { SpellsComponent } from './components/spells/spells.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'characters',
        component: CharactersComponent,
        pathMatch: 'full'
    },
    {
        path: 'spells',
        component: SpellsComponent,
        pathMatch: 'full'
    },
    {
        path: 'potions',
        component: PotionsComponent,
        pathMatch: 'full'
    },
    {
        path: 'contact',
        component: ContactComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
