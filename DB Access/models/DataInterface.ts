import { Document } from 'mongoose';

export default interface Data extends Document {
    value: string;
}