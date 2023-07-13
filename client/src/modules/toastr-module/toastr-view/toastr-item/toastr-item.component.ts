import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ToastrMessage} from '../../toastr-service/toastr.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'admin-platform-toastr-item',
    template: `
        <div [@fadeState]="stateName" [ngClass]="{'alert-info': message.level=='info',
'alert-success': message.level=='success',
'alert-warning': message.level=='warning',
'alert-danger': message.level=='danger'}" class="alert-box-size content-fit">

            <div class="message-title-container" *ngIf="message.title || message.forceTitle === true">
                <div class="message-title">
                    {{message.title}}
                </div>
                <div class="message-title-icon">
                    <i class="fas fa-times" (click)="closeAlert()"></i>
                </div>
            </div>
            <div class="message-content" *ngIf="message.content" [innerHTML]="message.content">
            </div>
        </div>
    `,
    styles: [`.content-fit {
        padding: 20px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .mat-icon.close-size {
        width: 11px;
        height: 11px;
        line-height: 11px;
        font-size: 19px;
    }

    .alert-box-size {
        width: 400px;
        height: auto;
        box-shadow: 3px 3px 10px 0px rgba(148, 148, 148, 0.8);
        margin-bottom: 15px;
    }

    .message-title-container {
        display: flex;
        flex-direction: row;
    }

    .message-title {
        font-size: 14px;
        font-weight: bold;
        flex: 1 0 auto;
    }

    .message-title-icon {
        font-size: 10px;
        font-weight: bold;
        flex: 0 0 auto;
        cursor: pointer;
    }

    .message-content {
        font-size: 13px;
    }

    .alert-info {
        background-color: #daeffd;
        color: #2b6a94;
        border-color: #2b6a94;
    }

    .alert-success {
        background-color: #cff5f2;
        color: #0a7c71;
        border-color: #0a7c71;
    }

    .alert-warning {
        background-color: #fef6dd;
        color: #957d32;
        border-color: #957d32;
    }

    .alert-danger {
        background-color: #fddddd;
        color: #933432;
        border-color: #933432;
    }
    `],
    animations: [
        trigger('fadeState', [
            state('show', style({
                opacity: 1
            })),
            state('hide', style({
                opacity: 0
            })),
            transition('show <=> hide', animate('600ms'))
        ])
    ]
})
export class ToastrItemComponent implements OnInit {

    @Output()
    messageExpired = new EventEmitter<any>();

    @Input()
    message: ToastrMessage;

    @Input()
    index: number;

    stateName: string;

    constructor() {
    }

    ngOnInit() {

        this.stateName = 'show';

        if (this.message !== undefined && this.message !== null) {
            setTimeout(() =>
                this.onMessageTimeout(), (this.message.duration * 1000)
            );
        }
    }

    onMessageTimeout() {
        this.stateName = 'hide';
        setTimeout(() =>
            this.messageExpired.emit({
                index: this.index
            }), 600);
    }

    closeAlert() {
        this.onMessageTimeout();
    }
}
