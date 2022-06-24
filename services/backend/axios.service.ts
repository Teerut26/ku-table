import axios, { AxiosInstance, AxiosStatic } from "axios";
import { LoginResponseInterface } from "interfaces/login.response.interface";
export default class AxiosServiceBackend {
    public axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://myapi.ku.th",
        });
    }

    public async getImage(token: string): Promise<string> {
        let { data } = await this.axiosInstance.get<any>(
            "/std-profile/stdimages",
            {
                headers: {
                    "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
                    "x-access-token": token,
                },
                responseType: "arraybuffer",
            }
        );
        return "data:image/jpeg;base64,"+Buffer.from(data, "binary").toString("base64");
    }

    public login(username: string, password: string) {
        return this.axiosInstance.post<LoginResponseInterface>(
            "/auth/login",
            {
                username,
                password,
            },
            {
                headers: {
                    authority: "myapi.ku.th",
                    accept: "*/*",
                    "accept-language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7",
                    "app-key": "txCR5732xYYWDGdd49M3R19o1OVwdRFc",
                    "content-type": "application/json",
                    origin: "https://my.ku.th",
                    referer: "https://my.ku.th/",
                    "sec-ch-ua":
                        '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                },
            }
        );
    }
}
