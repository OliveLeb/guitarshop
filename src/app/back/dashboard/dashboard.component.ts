import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/service/articles.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {
  articles;
  nbArticles: number;
  utilisateurs;
  nbUsers: number;
  articlesPublished = 0;
  usersActif = 0;
  nbGuitare = 0;
  nbCordes = 0;
  nbAmpli = 0;

  constructor(
    private serviceArticle: ArticlesService,
    private serviceUser: UsersService
  ) {}

  ngOnInit(): void {
    this.serviceArticle.getAllArticles().subscribe((res: Response) => {
      this.articles = res;
      this.nbArticles = this.articles.length;
      this.getDataArticles(this.articles);
      // console.log(this.nbArticles);
    });
    this.serviceUser.getAllUsers().subscribe((res: Response) => {
      this.utilisateurs = res;
      this.nbUsers = this.utilisateurs.length;
      this.getActif(this.utilisateurs);
    });
  }

  getDataArticles(articles) {
    // console.log(articles);
    for (const data of articles) {
      if (data.published) { this.articlesPublished += 1; }
      data.categorie[0] === 'guitare'
        ? (this.nbGuitare += 1)
        : data.categorie[0] === 'cordes'
        ? (this.nbCordes += 1)
        : (this.nbAmpli += 1);
    }
  }
  getActif(users) {
    for (const data of users) {
      if (data.estActif) { this.usersActif += 1; }
    }
  }
}
