export class User {
    constructor(
        public id: string,
        public email: string,
        public isAdmin: boolean,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public contact?: string
    ) {}
}