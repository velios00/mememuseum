export interface Comment {
    id?: number;
    content: string;
    User: {
        userName: string;
        profileImage: string;
    };
    userId: string
}