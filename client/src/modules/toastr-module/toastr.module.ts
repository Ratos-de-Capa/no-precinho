import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ToastrService} from './toastr-service/toastr.service';
import {ToastrItemComponent} from './toastr-view/toastr-item/toastr-item.component';
import {ToastrContainerComponent} from './toastr-view/toastr-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ToastrContainerComponent,
        ToastrItemComponent
    ],
    exports: [ToastrContainerComponent, ToastrItemComponent],
})
export class ToastrModule {
    static forRoot(): ModuleWithProviders<ToastrModule> {
        return {
            ngModule: ToastrModule,
            providers: [ToastrService]
        };
    }

    static forChild(): ModuleWithProviders<unknown> {
        return {
            ngModule: ToastrModule
        };
    }
}
