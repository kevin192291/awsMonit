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
    
  }
}
