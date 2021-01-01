import { Component, OnInit, Input } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input('hideLogout') hideLogout;
  constructor(private oktaAuth: OktaAuthService) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.oktaAuth.logout('/');
  }

}
