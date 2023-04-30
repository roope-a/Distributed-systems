import { Schema, model } from 'mongoose';
import Data from './DataInterface';

const dataSchema = new Schema ({
    value: { type: String, required: true },
}, { collection: 'data' });

export default model<Data>('Data', dataSchema);