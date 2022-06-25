import axios, { AxiosInstance } from "axios";
export default class AxiosWithTokenServiceFrontend {
    public axiosInstance: AxiosInstance;
    constructor(accesstoken:string) {
        this.axiosInstance = axios.create({
            baseURL: "/api",
            headers:{
                "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
                "x-access-token": accesstoken,
            }
        });
    }
}
