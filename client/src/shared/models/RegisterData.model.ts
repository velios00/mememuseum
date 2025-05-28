import { InputField } from "./InputField.model";

export interface RegisterData {
    usr: InputField<string>;
    pwd: InputField<string>;
}