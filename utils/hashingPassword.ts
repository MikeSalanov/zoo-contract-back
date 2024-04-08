import bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;

const hashingPassword = async (password: string): Promise<string> => await bcrypt.hash(password, SALT_ROUNDS);

export default hashingPassword;
