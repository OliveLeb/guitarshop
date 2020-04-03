import { Component, OnInit, HostListener } from "@angular/core";
import { CommentaireService } from "src/app/service/commentaire.service";
import { ArticlesService } from "src/app/service/articles.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-commentaire",
  templateUrl: "./commentaire.component.html",
  styleUrls: [
    "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./commentaire.component.css"
  ]
})
export class CommentaireComponent implements OnInit {
  constructor(
    private serviceCom: CommentaireService,
    private serviceArticle: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.quillConfig = this.serviceCom.quillConfig;
  }
  article;
  commentaires;
  oneCommentaire;
  quillConfig: object;
  showForm = false;
  displayButton = false;
  btn = false;
  commentForm: FormGroup = this.fb.group({
    contenu: ["", Validators.required],
    identifiant: ["", Validators.required],
    _idArticle: ""
  });

  ngOnInit(): void {
    this.getComment();
    this.getOneArticle();
  }

  getOneArticle() {
    this.route.paramMap.subscribe(params => {
      const _id = params.get("id");
      this.serviceArticle
        .getArticleById(_id)
        .subscribe((response: Response) => {
          this.article = response;
          // console.log(this.article);
          this.getIdArticle(this.article);
        });
    });
  }
  getComment() {
    this.serviceCom.getCommentaire().subscribe((res: Response) => {
      this.commentaires = res;
    });
  }
  getIdArticle(article) {
    for (const data of article) {
      this.commentForm.patchValue({
        _idArticle: data._id
      });
    }
  }
  onSubmit(_id: string) {
    // console.log(this.commentForm.value);
    const post = this.commentForm.value;

    this.serviceCom.createCommentaire(post).subscribe((res: Response) => {
      // console.log(res);
      post._id = res["_id"];
      this.commentaires.splice(0, 0, post);
    });
    this.router.navigate(["/article/" + _id]);
    this.cancel();
  }
  addComment() {
    !this.showForm ? (this.showForm = true) : (this.showForm = false);
    // console.log(this.showForm);
  }
  deleteCom(_id) {
    if (confirm("Supprimer ce commentaire ?")) {
      this.serviceCom.deleteCommentaire(_id).subscribe((res: Response) => {
        const index = this.commentaires.indexOf(_id);
        this.commentaires.splice(index, 1);
        this.cancel();
      });
    }
  }
  updateCom(commentaire) {
    this.showForm = true;
    this.btn = true;
    this.oneCommentaire = commentaire;
    // console.log(this.oneCommentaire);
    this.commentForm.patchValue({
      contenu: commentaire.contenu,
      identifiant: commentaire.identifiant,
      _idArticle: commentaire._idArticle
    });

    // console.log(this.commentForm.value);
  }
  onUpdate() {
    const newData = this.commentForm.value;
    console.log(newData);

    this.serviceCom
      .updateCommentaire(this.oneCommentaire._id, newData)
      .subscribe((res: Response) => {
        console.log(res);
        this.cancel();
      });
    // console.log(newData);
  }
  cancel() {
    this.commentForm.reset();
    this.showForm = false;
    this.ngOnInit();
  }
}
