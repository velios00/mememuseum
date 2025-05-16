import { ReactNode, useSyncExternalStore } from "react";
import { Navigate } from "react-router-dom";
import { subscribe , getToken} from "../utils/storage.utils";

export default function AuthGuard(props: { children: ReactNode; isProtected: boolean }) {
    const token = useSyncExternalStore(subscribe, getToken);

    if(props.isProtected) {
        return token ? 
    }
}