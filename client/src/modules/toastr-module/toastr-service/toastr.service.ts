import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export const ToastrLevel = {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger'
};

@Injectable()
export class ToastrService {

    toastrSubject = new Subject<any>();
    toastrObservable: Observable<any> = this.toastrSubject.asObservable();

    constructor() {
    }

    createMessage(toastrMessage: ToastrMessage) {
        this.toastrSubject.next(toastrMessage);
    }

    info(message: string, title?: string) {
        const infoToastrMessage = new ToastrMessage();
        infoToastrMessage.content = message;
        infoToastrMessage.title = title;

        this.createMessage(infoToastrMessage);
    }

    danger(message: string, title?: string) {
        const dangerToastrMessage = new ToastrMessage();
        dangerToastrMessage.content = message;
        dangerToastrMessage.title = title;
        dangerToastrMessage.level = ToastrLevel.Danger;

        this.createMessage(dangerToastrMessage);
    }

    success(message: string, title?: string) {
        const successToastrMessage = new ToastrMessage();
        successToastrMessage.content = message;
        successToastrMessage.title = title;
        successToastrMessage.level = ToastrLevel.Success;

        this.createMessage(successToastrMessage);
    }

    warning(message: string, title?: string) {
        const warningToastrMessage = new ToastrMessage();
        warningToastrMessage.content = message;
        warningToastrMessage.title = title;
        warningToastrMessage.level = ToastrLevel.Warning;

        this.createMessage(warningToastrMessage);
    }
}

export class ToastrMessage {

    title: string;
    level = ToastrLevel.Info;
    content: string;
    duration = 5;
    forceTitle = false;
}
