import { Meme } from "./Meme.model";

export interface MemeStateData {
    content: Meme[];
    totalPages: number;
    page: number;
    limit: number;
    type: string;
}