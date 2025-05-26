// Import or define InputField type
import { InputField } from "./InputField.model";

export interface LoginData {
    usr: InputField<string>;
    pwd: InputField<string>;
}