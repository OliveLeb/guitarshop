import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../service/articles.service';
import { ParametreService } from 'src/app/service/parametre.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  articles;
  totalArticles: number;
  param;
  page = 1;
  nbItems: number;
  constructor(
    private service: ArticlesService,
    private serviceNbItem: ParametreService
  ) {}

  ngOnInit() {
    this.loadArticles();
    this.loadNbItem();
  }

  loadNbItem() {
    this.serviceNbItem.getParam().subscribe((res: Response) => {
      this.param = res;
      // console.log(this.param);
      for (const param of this.param) {
        return (this.nbItems = param.nbItem);
      }
    });
  }

  loadArticles() {
    this.service.getAllArticles().subscribe((res: Response) => {
      this.articles = res;

      this.articles.sort((a, b) => {
        return a.createdAt === b.createdAt ? 0 : a.createdAt ? -1 : 1;
      });

      function filtrePubli(articles) {
        if (articles.published) {
          return true;
        } else { return false; }
      }

      this.articles = this.articles.filter(filtrePubli);
      // console.log(this.articles);
    });
  }
  changeTrie(trie) {
    if (trie.value === 'dateajout') {
      this.articles.sort((a, b) => {
        return a.createdAt === b.createdAt ? 0 : a.createdAt ? -1 : 1;
      });
    } else if (trie.value === 'prixup') {
      this.articles.sort((a, b) => {
        return a.prix - b.prix;
      });
    } else if (trie.value === 'prixdown') {
      this.articles.sort((a, b) => {
        return b.prix - a.prix;
      });
    }
  }
}
