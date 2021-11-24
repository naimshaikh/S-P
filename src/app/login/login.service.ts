import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  /* Store the static user for login */
  users = [
    {
      email: 'samcom@gmail.com',
      password: '123',
      userName: 'Samcom'
    },
    {
      email: 'samcomTechnobrains@gmail.com',
      password: 'sam123@',
      userName: 'Samcom Technobrains'
    }
  ]
  constructor() { }

  /* This method used for set the user and check the email and password */
  public checkUser(user: any): boolean {
    this.users.forEach(element => {
      if (element.email === user.email && element.password === user.password) {
        localStorage.setItem('user', JSON.stringify(element));
      }
    });
    return this.users.some(x => x.email === user.email && x.password === user.password) ? true : false;
  }
}
