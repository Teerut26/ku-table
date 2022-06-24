import axios, { AxiosInstance, AxiosStatic } from "axios";
import { LoginResponseInterface } from "interfaces/login.response.interface";
export default class AxiosServiceFrontend {
    public axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "/api",
        });
    }

    public login(username: string, password: string) {
        return this.axiosInstance.post<LoginResponseInterface>("/auth/login", {
            username,
            password,
        });
    }
}
