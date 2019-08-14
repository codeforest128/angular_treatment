// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
	// enable this router to set which default theme to load,
	// leave the path value empty to enter into nested router in ThemeModule
	// {path: '', loadChildren: 'app/views/themes/default/theme.module#ThemeModule'},

	/** START: remove this themes list on production */
	// list of routers specified by demos, for demo purpose only!
	{path: '', pathMatch: 'full', redirectTo: 'dashboard'},
	{path: 'default', loadChildren: () => import('./views/themes/default/theme.module').then(m => m.ThemeModule)},
	{path: '', loadChildren: () => import('./views/themes/demo2/theme.module').then(m => m.ThemeModule)},
	/** END: themes list end */

	{path: '**', redirectTo: 'default/error/403', pathMatch: 'full'},
	// {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
