export interface User {
    id:  number;
    username: string;
    email: string;
    type: string; // USER, ADMIN
    lastLoginDate: string; // date: yyyy-MM-dd
}
