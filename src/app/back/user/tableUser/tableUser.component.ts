import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../service/users.service';

@Component({
  selector: 'app-tableUser',
  templateUrl: './tableUser.component.html',
  styleUrls: [
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './tableUser.component.css'
  ]
})
export class TableUserComponent implements OnInit {
  users;
  data;
  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((response: Response) => {
      this.users = response;
    });
  }

  onDeleteUser(_id: string) {
    if (confirm('Supprimer cet utilisateur ?')) {
      this.service.deleteUser(_id).subscribe((response: Response) => {
        // console.log(response);
        const index = this.users.indexOf(_id);
        this.users.splice(index, 1);
        // this.router.navigate(["/admin/user"]);
        this.ngOnInit();
      });
    } else {
      return;
    }
  }

  updateActif(status: boolean, user) {
    const data = {
      nom: user.nom,
      prenom: user.prenom,
      identifiant: user.identifiant,
      password: user.password,
      email: user.email,
      role: user.role,
      estActif: status
    };
    // console.log(this.data);

    this.service.updateUser(user._id, data).subscribe((res: Response) => {
      data.estActif = status;
      // console.log(res);
      this.ngOnInit();
    });
  }
}
