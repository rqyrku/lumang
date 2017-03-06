import {Component, OnInit} from '@angular/core';
import {HttpModule} from '@angular/http';


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
    
    ngOnInit() {
    }
}
