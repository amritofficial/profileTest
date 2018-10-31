import { AnswerIssue } from "../models/answer-issue";

export class QuestionThread {
    public objectId: any;
    public issueTitle: string;
    public issueTextDescription: string;
    public issueCodeDescription: string;
    public issueTags: string[];
    public username: string;
    public distance: any;
    public timestamp: any;
    public userId: any;
    public answers: AnswerIssue[];
}