import bcrypt from "bcrypt";

//to convert normal string password into hashed password
export const hashPassword = async(password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

//to compare the user given password and hashed password in database
export const comparePassword = async (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}