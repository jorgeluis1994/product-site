import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DialogFormService {
    private readonly _isOpen = signal(false);
    readonly isOpen = this._isOpen.asReadonly();

    toggle() {
        this._isOpen.update(state => !state);
    }

    open() {
        this._isOpen.set(true);
    }

    close() {
        this._isOpen.set(false);
    }
}
