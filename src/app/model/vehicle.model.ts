import { Review } from './review.model';
import { User } from './user.model';

export class Vehicle {
    constructor(
        public id: string,
        public modelName: string,
        public manufacturer,
        public desc: string,
        public imgUrl: string,
        public yearOfProduction: number,
        public price: number,
        public availableFrom: Date,
        public owner: User,
        public likes: Review[]) {}

}