import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthenticationService } from './_services/index';


/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    selector: 'app-root',
    viewProviders: [HttpModule],
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    currentUser:Object;
    loggedIn: any;

    ngOnInit() {
    }

    constructor(private auth: AuthenticationService) {
        this.loggedIn = this.auth.isLoggedIn;
    }


    isLoggedIn()
    {
      if(this.loggedIn == true){
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
        return true;
      }
      else {
        return false;
      }
    }
    logout(){
      sessionStorage.removeItem('currentUser');
    }
}
