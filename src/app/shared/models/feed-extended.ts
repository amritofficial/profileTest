import { Like } from "./like";
import { User } from "./user";
import { Comment } from "./comment";

export class FeedExtended {
    public user: User;
    public timeStamp: any;
    public feedBody: any;
    public feedId: any;
    public feedImageUrl?: any;
    public feedVideoUrl?: any;
    public like: Like[];
    public comment: Comment[];
}