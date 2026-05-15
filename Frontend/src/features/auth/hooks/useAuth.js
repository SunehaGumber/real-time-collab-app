import { register, login, logout, logoutAll, verifyCode, verifyPassCode, resendOTP, updatePassword, getMe, forgotPassword, changePassword, resendPasswordOTP } from "../services/auth.service";
import { useSelector, useDispatch } from "react-redux";
import { authStart, authFailure, authSuccess, clearError, setUser,logout as logoutAction } from "../slice/auth.slice";

export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ username, email, password }) => {
        dispatch(authStart());
        try {
            const data = await register({ username, email, password });
            dispatch(setUser(data?.user));
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleLogin = async ({ email, password }) => {
        dispatch(authStart());
        try {
            const data = await login({ email, password });
            dispatch(authSuccess({ user:data?.user, token:data?.accessToken }));
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        } 
    }

    const handleVerifyCode = async ({ otp, email }) => {
        dispatch(authStart());
        try {
            const data = await verifyCode({ otp, email });
            dispatch(authSuccess({user:data?.user, token:data?.accessToken  }));
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleLogout = async () => {
        dispatch(authStart());
        try{
            await logout();
            dispatch(logoutAction());
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleLogoutAll = async () => {
        dispatch(authStart());
        try {
            await logoutAll();
            dispatch(logoutAction());
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }
    const handleResendOTP = async ({email}) => {
        try {
            await resendOTP({ email });
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleForgotPassword = async ({email}) => {
        try {
            const data = await forgotPassword({email});
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleVerifyPassCode = async ({ email, otp }) => {
        try {
            const data = await verifyPassCode({ email, otp });
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleChangePassword = async ({newPassword,confirmPassword}) => {
        try {
            const data = await changePassword({ newPassword, confirmPassword });
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }

    const handleResendPasswordOtp = async ({email}) => {
        try {
            const data = await resendPasswordOTP({ email });
            return data;
        } catch (err) {
            dispatch(authFailure(err.message));
            return null;
        }
    }
    return {
        handleLogin, handleRegister, handleLogout, handleLogoutAll,
        handleVerifyCode,handleResendOTP,handleForgotPassword,handleVerifyPassCode,handleChangePassword,handleResendPasswordOtp
    }
}