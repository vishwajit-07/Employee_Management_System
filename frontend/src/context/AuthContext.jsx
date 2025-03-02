import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (formData) => {
        try {
            const response = await axios.post("http://localhost:5000/auth/register", formData);
            if (response.data.success) {
                return true;
            }
        } catch (error) {
            console.error("Registration failed", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
