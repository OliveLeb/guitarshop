import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: [
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './edit-user.component.css'
  ]
})
export class EditUserComponent implements OnInit {
  user;
  roleListe: Array<string>;
  constructor(
    private service: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roleListe = service.getRole();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const _id = params.get('id');
      this.service.getUserById(_id).subscribe((res: any) => {
        this.user = res;
        // console.log(this.user);
      });
    });
  }

  onSubmitUser(f, _id: string) {
    const data = f.value;
    // console.log(_id);
    // console.log(f.value);
    this.service.updateUser(_id, data).subscribe((res: Response) => {});
    this.cancel(f);
  }
  cancel(f) {
    f.resetForm();
    this.router.navigate(['/admin/user']);
  }
}
