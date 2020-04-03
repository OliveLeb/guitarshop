import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { MenuComponent } from './commun/menu/menu.component';
import { NavComponent } from './front/nav/nav.component';
import { FooterComponent } from './commun/footer/footer.component';
import { AccueilComponent } from './front/accueil/accueil.component';
import { ArticleComponent } from './front/article/article.component';
import { NotFoundComponent } from './front/not-found/not-found.component';
import { MenuDashboardComponent } from './back/menu-dashboard/menu-dashboard.component';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { TableComponent } from './back/article/table/table.component';
import { TableUserComponent } from './back/user/tableUser/tableUser.component';
import { AjouterComponent } from './back/article/ajouter/ajouter.component';
import { LoginComponent } from './commun/login/login.component';
import { AddUserComponent } from './back/user/add-user/add-user.component';
import { EditArticleComponent } from './back/article/edit-article/edit-article.component';
import { EditUserComponent } from './back/user/edit-user/edit-user.component';
import { ParametreComponent } from './back/parametre/parametre.component';

import { ArticlesService } from './service/articles.service';
import { UsersService } from './service/users.service';
import { ParametreService } from './service/parametre.service';
import { CommentaireService } from './service/commentaire.service';
import { ConnexionService } from './service/connexion.service';
import { AuthGuardService } from './service/auth-guard.service';
import { CommentaireComponent } from './front/article/commentaire/commentaire.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    AccueilComponent,
    ArticleComponent,
    NotFoundComponent,
    NavComponent,
    MenuDashboardComponent,
    DashboardComponent,
    TableComponent,
    TableUserComponent,
    AjouterComponent,
    LoginComponent,
    AddUserComponent,
    EditArticleComponent,
    EditUserComponent,
    ParametreComponent,
    CommentaireComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: AccueilComponent },
      {
        path: 'article/:id',
        component: ArticleComponent
      },
      {
        path: 'admin/article/ajouter',
        component: AjouterComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/article/edit/:id',
        component: EditArticleComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/article',
        component: TableComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/user/add-user',
        component: AddUserComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/user/edit/:id',
        component: EditUserComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/user',
        component: TableUserComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin/parametre',
        component: ParametreComponent /*,
        canActivate: [AuthGuardService]*/
      },
      {
        path: 'admin',
        component: DashboardComponent /*,
        canActivate: [AuthGuardService]*/
      },
      { path: '**', component: NotFoundComponent }
    ]),
    BrowserAnimationsModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ArticlesService,
    UsersService,
    ParametreService,
    CommentaireService,
    ConnexionService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
