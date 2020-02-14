import { User } from './user.model';

export class Review {
    constructor(
        public comment: string,
        public rate: number,
        public estimatedPrice: number,
        public creator: User,
        public allowed: boolean,
        public date: Date
    ) {}
}