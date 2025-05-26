import { Meme } from "./Meme.model";


export interface MemeDialog {
    open: boolean;
    onClose: () => void;
    meme: Meme | null;
}