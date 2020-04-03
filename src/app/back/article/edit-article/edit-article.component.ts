import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/service/articles.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: [
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './edit-article.component.css'
  ]
})
export class EditArticleComponent implements OnInit {

  constructor(
    private service: ArticlesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quillConfig = this.service.quillConfig;
    this.categorieArticle = this.service.categorieArticle;
  }
  get categorie(): FormArray {
    return this.formUpdateArticle.get('categorie') as FormArray;
  }
  quillConfig: object;
  article;
  categorieArticle: Array<string>;

  formUpdateArticle: FormGroup = this.fb.group({
    titre: ['', Validators.required],
    contenu: ['', Validators.required],
    prix: ['', Validators.required],
    img: ['', Validators.required],
    categorie: this.fb.array([this.fb.control(''), this.fb.control('')]),
    nomAuteur: ['', Validators.required],
    emailAuteur: ['', Validators.required],
    published: ['', Validators.required]
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this.service.getArticleById(_id).subscribe((res: any) => {
        this.article = res;
        this.getData(this.article);
      });
    });
  }

  getData(article) {
    console.log(article);
    for (const data of article) {
      this.formUpdateArticle.patchValue({
        titre: data.titre,
        contenu: data.contenu,
        prix: data.prix,
        img: data.img,
        categorie: data.categorie,
        nomAuteur: data.nomAuteur,
        emailAuteur: data.emailAuteur,
        published: data.published
      });
      // console.log(data);
    }
  }

  addCategorie() {
    this.categorie.push(this.fb.control(''));
  }
  removeCategorie(i: number) {
    this.categorie.removeAt(i);
  }

  onUpdateArticle(article) {
    // console.log(this.formUpdateArticle.value);
    const art = this.formUpdateArticle.value;

    const newData = {
      titre: art.titre,
      contenu: art.contenu,
      nomAuteur: art.nomAuteur,
      emailAuteur: art.emailAuteur,
      categorie: art.categorie,
      prix: art.prix,
      img: art.img,
      published: art.published
    };
    // console.log(newData);
    // console.log(newData.categorie);
    // console.log(article);

    this.service
      .updateArticle(article._id, newData)
      .subscribe((res: Response) => {
        // console.log(res);
      });
    this.goBack();
  }
  goBack() {
    this.formUpdateArticle.reset();
    this.router.navigate(['/admin/article']);
  }
}
