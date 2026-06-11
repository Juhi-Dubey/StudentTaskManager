const TOKEN_KEY = "student_task_manager_token";
const USER_KEY = "student_task_manager_user";

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const setUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);

    try{
        return user ? JSON.parse(user) : null;
    }catch(error){
        localStorage.removeItem(USER_KEY);
        return null;
    }
};

export const getUserName = () => {
    return getUser()?.name || "";
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
    return Boolean(getToken());
};
