import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import QRCode from 'easyqrcodejs';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit, AfterViewInit {

  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  @ViewChild('qrcode', { static: false })
  qrcode!: ElementRef;

  ngAfterViewInit(){

    // Options
    var options = {
      text: this.auth.currentUser?.email
    }

    // Create new QRCode Object
    new QRCode(this.qrcode.nativeElement, options);

  }

}
