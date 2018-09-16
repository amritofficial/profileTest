import { User } from "./user";
import { CustomDate } from "./custom-date";

export class Education {
    public school: string;
    public schoolCity: string;
    public schoolCountry: string;
    public program: string;
    public description: string;
    public startDate: CustomDate;
    public endDate: CustomDate;
    public user: User;
    constructor() {}
}