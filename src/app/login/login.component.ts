import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence
} from "firebase/auth";

import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged,
  UserCredential
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {

  }

  async submit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const result: UserCredential = await this.emailLogin(this.emailFormControl.value, this.passwordFormControl.value);
      console.log(result);
      if (result && result.user && result.user.uid) {
        this.router.navigate(['/status/status-list']);
      } else {
        console.log("login failed");
      }
    }
  }

  private async emailLogin(email: string, password: string): Promise<any> {
    const auth = getAuth();
    return await setPersistence(auth, browserLocalPersistence).then(async () => {
      return await signInWithEmailAndPassword(this.auth, email, password);
    });

  }

}
