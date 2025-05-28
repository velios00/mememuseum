import { Meme } from "./Meme.model";


export interface MemeDialogProps {
    open: boolean;
    onClose: () => void;
    meme: Meme | null;
}