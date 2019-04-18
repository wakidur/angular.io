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


// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader, TranslateService, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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


// AoT requires an exported function for factories
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return 'Translations not available for ';
  }
}

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


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false,
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler
      },
      useDefaultLang: false
    }),

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
    TranslateModule,
  ]
})
export class CoreModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "fr", "cn", "hi", "spa"]);
     // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // get the current UserLang
    let browserLang = translate.getBrowserLang();
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(browserLang.match(/en|fr|cn|hi|spa/) ? browserLang : 'en');
  }
}
