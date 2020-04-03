import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "../../../service/articles.service";
import { Router } from "@angular/router";
import { FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
  selector: "app-ajouter",
  templateUrl: "./ajouter.component.html",
  styleUrls: [
    "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./ajouter.component.css"
  ]
})
export class AjouterComponent implements OnInit {
  quillConfig: object;
  categorieArticle: string[];
  quillAddArticle = {
    height: "100px"
  };
  _articles;
  image: any = { name: "" };

  constructor(
    private service: ArticlesService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.quillConfig = this.service.quillConfig;
    this.categorieArticle = this.service.categorieArticle;
  }
  formCreateArticle = this.fb.group({
    titre: ["", Validators.required],
    contenu: ["", Validators.required],
    prix: ["", Validators.required],
    img: ["", Validators.required],
    categorie: this.fb.array([this.fb.control("")]),
    nomAuteur: ["", Validators.required],
    emailAuteur: ["", Validators.required],
    published: ["", Validators.required]
  });
  get categorie(): FormArray {
    return this.formCreateArticle.get("categorie") as FormArray;
  }

  addCategorie() {
    this.categorie.push(this.fb.control(""));
  }
  removeCategorie(i: number) {
    this.categorie.removeAt(i);
  }
  ngOnInit() {
    this.service.getAllArticles().subscribe((response: Response) => {
      this._articles = response;
    });
  }

  onCreateArticle() {
    // console.log(this.formCreateArticle.value);
    const article = this.formCreateArticle.value;
    // console.log(article);
    this.service.createArticle(article).subscribe((res: Response) => {
      article._id = res["_id"];
      this._articles.splice(0, 0, article);
    });
    this.cancel();
  }
  cancel() {
    this.formCreateArticle.reset();
    this.router.navigate(["/admin/article"]);
  }
  /*********************/
  /*
  onFileSelected(event) {
    this.image = event.target.files[0];
    console.log(this.image);
    console.log(this.image.name);
  }*/
}
