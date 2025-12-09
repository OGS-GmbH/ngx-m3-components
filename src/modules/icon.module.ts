import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconComponent } from "../components/icon/icon.component";
import { MatRippleModule } from "@angular/material/core";
import { ObserversModule } from "@angular/cdk/observers";
import { provideIconDefaultPrefix } from "../providers/icon.provider";
import { IconConfiguration } from "../types/icon.type";

/**
 * IconModule is a module providing the IconComponent.
 * @category Modules
 *
 * @since 1.0.0
 * @author Simon Kovtyk
 */
/* eslint-disable @tseslint/no-extraneous-class */
@NgModule({
  imports: [
    // @angular modules
    CommonModule,

    // @angular/cdk modules
    ObserversModule,

    // Dependency modules
    FontAwesomeModule,
    MatRippleModule
  ],
  declarations: [
    IconComponent
  ],
  exports: [
    IconComponent
  ]
})
export class IconModule {
  public static forRoot (configuration: IconConfiguration): ModuleWithProviders<IconModule> {
    return {
      ngModule: IconModule,
      providers: [
        provideIconDefaultPrefix(configuration.prefix)
      ]
    };
  }

  public static forChild (): ModuleWithProviders<IconModule> {
    return {
      ngModule: IconModule
    };
  }
}
/* eslint-enable @tseslint/no-extraneous-class */
