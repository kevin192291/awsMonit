import { Component, OnInit } from '@angular/core';
import { Auth, reauthenticateWithCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.auth.currentUser?.reload().then(() => {
          console.log(this.auth.currentUser);
          this.router.navigate(['status/status-list']);
        });
      }
    })
  }
}
