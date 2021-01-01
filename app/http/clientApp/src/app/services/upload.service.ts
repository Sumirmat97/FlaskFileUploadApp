import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  async upload(file) {
    const accessToken = await this.oktaAuth.getAccessToken();
    const url = `http://127.0.0.1:4433/uploadFile`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken + ''
      })
    }
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData)
    return this.http.post(url, formData, httpOptions).toPromise();
  }
}
