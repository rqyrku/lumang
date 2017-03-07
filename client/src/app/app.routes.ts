import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './login/login.routes';
import { RegisterRoutes} from './register/register.routes';


export const APP_ROUTER_PROVIDERS = [

  ...LoginRoutes,
  ...RegisterRoutes,

  {path: '', redirectTo: '/', pathMatch: 'full'}

];
