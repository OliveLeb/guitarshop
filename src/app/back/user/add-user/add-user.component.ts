import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../../service/users.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: [
    "../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./add-user.component.css"
  ]
})
export class AddUserComponent implements OnInit {
  _users;
  roleListe: Array<string>;

  constructor(private service: UsersService, private router: Router) {
    this.roleListe = service.getRole();
  }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((response: Response) => {
      this._users = response;
    });
  }

  onSubmitUser(f) {
    // console.log(f.value);
    const user = f.value;
    this.service.createUser(user).subscribe((res: Response) => {
      // console.log(res);
      user._id = res["_id"];
      this._users.splice(0, 0, user);
    });
    this.cancel(f);
  }
  cancel(f) {
    f.resetForm();
    this.router.navigate(["/admin/user"]);
  }
}
