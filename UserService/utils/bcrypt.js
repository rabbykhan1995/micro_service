import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const passwordHashed = await bcrypt.hash(password,10);
        return passwordHashed;
    } catch (error) {
        console.log('error in hashing password : ', error);
        
    }
}

export const comparePassword = async (hashedPassword, password) => {
    try {
        const passwordIsVerified = await bcrypt.compare(password, hashedPassword);

        return passwordIsVerified; 
        
    } catch (error) {
        console.error('Error in comparing password:', error);
    }
};