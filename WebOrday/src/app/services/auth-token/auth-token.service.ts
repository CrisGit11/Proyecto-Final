import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthTokenService {

    private nameToken: string = 'token';

    public getToken(): string | null {
        return sessionStorage.getItem(this.nameToken);
    }

    public setToken(token: string): void {
        sessionStorage.setItem(this.nameToken, token);
    }

}
