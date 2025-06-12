import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : []; //  Returns empty array if null
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken') as string;
  }

  public clear() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles');
  }
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].rolename === 'Admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].rolename === 'User';
  }
}
