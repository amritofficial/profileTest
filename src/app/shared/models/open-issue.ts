import { AnswerIssue } from "./answer-issue";

export class OpenIssue {
    public objectId: any;
    public title: string;
    public parentTag: string;
    public parentTagObjectId: string;
    public childrenTags: string[];
    public timestamp: any;
    public issueTextDescription: string;
    public issueCodeDescription: string;
    public userId: any;
    public username: any;
    public answers: AnswerIssue[];
}