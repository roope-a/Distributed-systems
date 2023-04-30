import { Document } from 'mongoose';

export default interface User extends Document {
    username: string;
    password: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}