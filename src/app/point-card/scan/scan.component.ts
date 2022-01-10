import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Html5Qrcode } from "html5-qrcode";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit, OnDestroy {
  private html5QrCode!: Html5Qrcode;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    this.html5QrCode.start({ facingMode: "environment" }, config, (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      debugger;
      this.router.navigate([`point-card/stamp/${decodedText}`]);
    }, this.onScanFailure);
  }

  ngOnDestroy(): void {
    this.html5QrCode.stop();
  }

  public onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`);
  }

}
