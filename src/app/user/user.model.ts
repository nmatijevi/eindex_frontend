export class User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    title: string;
    authorities: string;

    constructor(id: number, username: string, firstName: string, lastName: string, title: string, authorities: string){
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.authorities = authorities;
    }
}