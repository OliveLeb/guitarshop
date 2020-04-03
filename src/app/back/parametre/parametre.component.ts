import { Component, OnInit } from "@angular/core";
import { ParametreService } from "src/app/service/parametre.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-parametre",
  templateUrl: "./parametre.component.html",
  styleUrls: [
    "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./parametre.component.css"
  ]
})
export class ParametreComponent implements OnInit {
  constructor(private service: ParametreService, private router: Router) {
    this.quillConfigTitre = this.service.quillConfigTitre;
    this.quillConfigTexte = this.service.quillConfigTexte;
  }
  parametre;
  submitted = false;
  quillConfigTitre: object;
  quillConfigTexte: object;

  paramForm = new FormGroup({
    nbItem: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(50)
    ]),
    baliseSEO: new FormControl("", Validators.required),
    texteIntro: new FormControl("", Validators.required),
    titreAccueil: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    this.service.getParam().subscribe((res: Response) => {
      this.parametre = res;
      // console.log(this.parametre);
      if (this.parametre.length !== 0) {
        this.submitted = true;
        for (const param of this.parametre) {
          this.paramForm.setValue({
            nbItem: param.nbItem,
            baliseSEO: param.baliseSEO,
            texteIntro: param.texteIntro,
            titreAccueil: param.titreAccueil
          });
        }
      }
    });
  }

  onSubmit() {
    // console.log(this.paramForm.value);
    // console.warn(this.paramForm.value);
    const param = this.paramForm.value;
    // console.log(param);

    this.service.postParam(param).subscribe((res: Response) => {
      param._id = res["_id"];
      this.parametre.splice(0, 0, param);
      this.refresh();
    });
  }

  onUpdate(param) {
    const data = {
      nbItem: this.paramForm.value.nbItem,
      baliseSEO: this.paramForm.value.baliseSEO,
      texteIntro: this.paramForm.value.texteIntro,
      titreAccueil: this.paramForm.value.titreAccueil
    };
    // console.log(param._id);
    // console.log(data);

    this.service.updateParam(param._id, data).subscribe((res: Response) => {
      // console.log(res);
      this.refresh();
    });
  }
  refresh() {
    this.router.navigate(["/admin/parametre"]);
    this.ngOnInit();
  }
}
