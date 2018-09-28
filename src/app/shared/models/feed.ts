import { Like } from "./like";
import { Comment } from "./comment";
import { User } from "./user";

export class Feed {
    public user: User;
    public timeStamp: any;
    public feedBody: any;
    public feedId: any;
    public like: Like[];
    public comment: Comment[];
}