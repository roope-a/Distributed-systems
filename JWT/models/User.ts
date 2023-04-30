import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from './UserInterface';

const userSchema = new Schema ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre<User>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

userSchema.methods.isValidPassword = async function ( password: string ): Promise<Error | Boolean> {
    return await bcrypt.compare(password, this.password);
};


export default model<User>('User', userSchema);