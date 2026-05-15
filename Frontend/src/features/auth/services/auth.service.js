import API from "../components/Api";;

export const register = async ({username,email,password}) => {
    try {
        const response = await API.post('/api/auth/register', {
            username, email, password
        });
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await API.post('/api/auth/login', {
            email,
            password
        })
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const verifyCode = async ({otp,email}) => {
    try {
        const response = await API.patch('/api/auth/verifyCode', {
            otp,email
        })
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const logout = async () => {
    try {
        await API.patch('/api/auth/logout');
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const logoutAll = async () => {
    try {
        await API.patch('/api/auth/logoutAll');
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const resendOTP = async ({ email }) => {
    try {
        await API.post('/api/auth/resendOtp');
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const updatePassword = async ({email,oldPassword,newPassword}) => {
    try {
        const response=await API.patch('/api/auth/updatePassword', {
            email,
            oldPassword,
            newPassword
        })
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getMe = async () => {
    try {
        const response = await API.get('/api/auth/get-me');
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const forgotPassword = async ({ email }) => {
    try {
        const response = await API.post('/api/auth/forgotPassword', {
            email
        });
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    } 
}

export const verifyPassCode = async ({email,otp}) => {
    try {
        const response = await API.post('/api/auth/verifyPassCode');
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const changePassword = async ({newPassword,confirmPassword}) => {
    try {
        const response = await API.post('/api/auth/changePassword');
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const resendPasswordOTP = async ({ email }) => {
    try {
        const response = await API.post('/api/auth/resendPasswordOTP', {
            email
        });
        return response?.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

