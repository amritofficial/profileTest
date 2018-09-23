import { User } from "./user";

export class LinkRequest {
    public to: User;
    public from: User;
    public status: string; // 0 approve, 1 decline, 2 pending, 3 friend
    public senderId: any;
}