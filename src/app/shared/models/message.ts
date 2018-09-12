import { User } from "./user";

export class Message {
    public senderId: string;
    public receiverId: string;
    public body: string;
    public timeSent: any;
    public user: User;
}