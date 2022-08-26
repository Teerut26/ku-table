import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";
import AxiosServiceBackend from "services/backend/axios.service";
 
import crypto from "crypto"

const encodeString = (str: string) => {
    return crypto
        .publicEncrypt(
            {
                key: process.env.PUBLIC_KEY!,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(str, "utf8")
        )
        .toString("base64");
};

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let axiosService = new AxiosServiceBackend();
        let { data } = await axiosService.login(
            encodeString(req.body.username),
            encodeString(req.body.password)
        );
        res.json(data)
    } catch (error:any) {
        throw new Error(error.message);
    }
};

export default catchErrorsFrom(Login);
