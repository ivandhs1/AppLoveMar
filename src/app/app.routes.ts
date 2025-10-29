import { Routes } from '@angular/router';
import { Setup } from './Components/setup/setup';
import { Play } from './Components/play/play';
import { Summary } from './Components/summary/summary';

export const routes: Routes = [
{ path: '', component: Setup },
{ path: 'play', component: Play },
{ path: 'summary', component: Summary },
{ path: '**', redirectTo: '' }
];
