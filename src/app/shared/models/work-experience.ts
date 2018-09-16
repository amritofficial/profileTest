import { User } from "./user";
import { CustomDate } from "./custom-date";

export class WorkExperience {
    public company: string;
    public city: string;
    public jobTitle: string;
    public country: string;
    public description: string;
    public startDate: CustomDate;
    public endDate: CustomDate;
    public user: User;
    public jobStatus: boolean; // job status will take either 0 for current job and 1 for the previous jobs
    constructor() {}
}