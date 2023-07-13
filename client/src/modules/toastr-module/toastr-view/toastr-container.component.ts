import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ToastrMessage, ToastrService} from '../toastr-service/toastr.service';

@Component({
    selector: 'toastr-container',
    template: `
        <div class="toastr-main-container" *ngIf="messages && messages.length>0">

            <admin-platform-toastr-item *ngFor="let m of messages; let idx = index;"
                                        (messageExpired)="onMessageExpired($event)"
                                        [message]="m" [index]="idx"></admin-platform-toastr-item>

        </div>
    `,
    styles: [`.platform-button {
        border-radius: 4px 4px 4px 4px;
        background-color: #557AB5;
    }

    .toastr-main-container {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 65px;
        right: 10px;
        z-index: 5000;
    }`]
})
export class ToastrContainerComponent implements OnInit, OnDestroy {

    toastrSubscription: Subscription;

    messages: ToastrMessage[] = [];

    constructor(private toastrService: ToastrService) {
    }

    ngOnInit() {

        this.toastrSubscription = this.toastrService.toastrObservable.subscribe(message => {
            this.messages.push(message);
        });
    }

    onMessageExpired($event) {
        this.messages.splice(+$event, 1);
    }

    ngOnDestroy(): void {
        this.toastrSubscription.unsubscribe();
    }
}
