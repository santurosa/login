import { Error } from "mongoose";
import { userModel } from "../../models/users.js";

export default class Users {
    getUser = async (email, password) => {
        try {
            const user = await userModel.findOne({ email, password });
            if (!user) throw new Error({ message: "credenciales incorrectas" });
            return user;
        } catch (error) {
            throw error;
        }
    }

    createUser = async (first_name, last_name, mail, age, password, rol) => {
        try {
            const email = mail.toLowerCase();
            const exists = await userModel.findOne({ email });
            if (exists) return new Error({ message: `Ya existe un usuario con el email ${email}` });
            const user = {
                first_name, last_name, email, age, password, rol
            };
            await userModel.create(user);
            const result = await userModel.findOne({ email });
            return result;
        } catch (error) {
            throw error;
        }
    }
}