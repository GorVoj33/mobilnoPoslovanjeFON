import { Review } from './review.model';
import { User } from './user.model';
import { CameraPhoto } from '@capacitor/core';

export class Vehicle {
    constructor(
        public id: string,
        public modelName: string,
        public manufacturer,
        public desc: string,
        public imgUrl: any,
        public yearOfProduction: number,
        public price: number,
        public availableFrom: Date,
        public owner: User,
        public reviews: Review[],
        public photo?: CameraPhoto) {}

}