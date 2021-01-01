import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  fileName;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fileName = localStorage['fileName'];
    if(!this.fileName)
    {
      alert('File name could not be found! \n Redirecting to upload page...');
      setTimeout(() => { this.router.navigate(['/home']) }, 500);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
