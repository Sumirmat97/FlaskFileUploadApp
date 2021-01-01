import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service'
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fileName;
  files;

  constructor(private uploadService: UploadService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  readyUpload(fileInputEvent: any) {
    this.files = fileInputEvent.target.files;
    if(!this.files || this.files.length == 0)
      return;
    this.fileName = this.files[0].name;
  }

  uploadFile() {
    if(!this.files)
    {
      this.openSnackBar('Select File to Upload');
      return;
    }

    this.uploadService.upload(this.files[0])
      .then((data) => {
        data = data[0]
        if(data['error'])
          this.openSnackBar(data['error']);
        else if(!data['fileName'])
          this.openSnackBar('Something went wrong!');
        else
        {
          localStorage.setItem('fileName', data['fileName']);
          this.router.navigate(['/success'], {replaceUrl: true});
        }
      })
      .catch((error) => {
        if(error['error'].error)
          this.openSnackBar(error['error'].error);
        else
          this.openSnackBar('Something went wrong!');
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
