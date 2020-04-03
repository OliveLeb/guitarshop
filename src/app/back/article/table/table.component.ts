import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../service/articles.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './table.component.css'
  ]
})
export class TableComponent implements OnInit {
  articles;
  constructor(private service: ArticlesService) {}

  ngOnInit(): void {
    this.service.getAllArticles().subscribe((res: Response) => {
      this.articles = res;
    });
  }

  deleteArticle(_id: string) {
    if (confirm('Supprimer cet article ?')) {
      this.service.deleteArticle(_id).subscribe((res: Response) => {
        // console.log(res);
        const index = this.articles.indexOf(_id);
        this.articles.splice(index, 1);
        this.ngOnInit();
      });
    }
  }

  updatePubli(status: boolean, article) {
    const data = {
      titre: article.titre,
      contenu: article.contenu,
      nomAuteur: article.nomAuteur,
      emailAuteur: article.emailAuteur,
      categorie: article.categorie,
      prix: article.prix,
      img: article.img,
      published: status
    };
    // console.log(article._id);
    // console.log(article);

    this.service.updateArticle(article._id, data).subscribe((res: Response) => {
      data.published = status;
      // console.log(res);
      this.ngOnInit();
    });
  }
}
