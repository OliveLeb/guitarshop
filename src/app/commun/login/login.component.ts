import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { ConnexionService } from 'src/app/service/connexion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MenuComponent>,
    private service: ConnexionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  invalidLogin = false;
  errorMessage = '';

  ngOnInit(): void {}

  onConnexion($event, form) {
    $event.preventDefault();
    const credentials = form.value;
    console.log(credentials);
    /* this.service.login(credentials).subscribe(res => {
      const token = res["auth-token"];
      localStorage.setItem("auth-token", token);
      console.log(res);
      this.router.navigate["/admin"];
    });*/

    this.service.login(credentials).subscribe(result => {
      console.log(result);

      if (result) {
        const returnUrl = this.route.snapshot.queryParamMap.get('return_url');
        this.router.navigate([returnUrl || '/admin']);
      } else { this.invalidLogin = true; }
    });
    this.onClose();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
