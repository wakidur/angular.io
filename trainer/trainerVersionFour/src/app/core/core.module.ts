/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";

/**
 * incorporate a third-party library
 */

import { ModalModule } from "ngx-modialog";
import { BootstrapModalModule } from "ngx-modialog/plugins/bootstrap";

/**
 * Application Service List
 *
 */
// under core module any  component use this service and also outside module can use this service
// that way i use only providers
import { AlertNotificationsService } from "./alert-notifications.service";
import { UserService } from "./user.service";
import { SessionStorageService } from "./session-storage.service";

/**
 *
 * The header component will not render unless
 * we import the core module and export the component from the core module.
 */
import { WorkoutRunnerHeaderComponent } from "./workout-runner-header/workout-runner-header.component";
import { WorkoutRunnerFooterComponent } from "./workout-runner-footer/workout-runner-footer.component";
import { AlertNotificationsComponent } from "./alert-notifications/alert-notifications.component";
// import ngx-translate and the http loader
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// export function createTranslateLoader(http: Http) {
//   return new TranslateStaticLoader(http, './assets/i18n', '.json');
// // }
// export class MyMissingTranslationHandler implements MissingTranslationHandler {
//   handle(params: MissingTranslationHandlerParams) {
//     return 'Translations not available for ' + params.key;
//   }
// }

@NgModule({
  declarations: [
    WorkoutRunnerHeaderComponent,
    WorkoutRunnerFooterComponent,
    AlertNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    HttpClientModule,
     // configure the imports
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false

  })
  ],
  providers: [
    AlertNotificationsService,
    UserService,
    SessionStorageService
  ],
  exports: [
    WorkoutRunnerHeaderComponent,
    WorkoutRunnerFooterComponent,
    AlertNotificationsComponent,
    TranslateModule

  ]
})
export class CoreModule {
  constructor(private translate: TranslateService) {

    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
}
}
