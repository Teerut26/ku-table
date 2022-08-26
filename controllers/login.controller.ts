import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";
import AxiosServiceBackend from "services/backend/axios.service";
 
import crypto from "crypto"

const encodeString = (str: string) => {
    return crypto
        .publicEncrypt(
            {
                key: "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAytOhlq/JPcTN0fX+VqObE5kwIaDnEtso2KGHdi9y7uTtQA6pO4fsPNJqtXOdrcfDgp/EQifPwVRZpjdbVrD6FgayrQQILAnARKzVmzwSMDdaP/hOB6i9ouKsIhN9hQUmUhbhaMkh7UXoxGW+gCSK8dq0+FJVnlt1dtJByiVAJRi2oKSdLRqNjk8yGzuZ6SrEFzAgYZwmQiywUF6V1ZaMUQDz8+nr9OOVU3c6Z2IQXCbOv6S7TAg0VhriFL18ZxUPS6759SuKC63VOOSf4EEHy1m0qBgpCzzlsB7D4ssF9x0ZVXLREFrqikP71Hg6tSGcu4YBKL+VwIDWWaXzz6szxeDXdYTA3l35P7I9uBUgMznIjTjNaAX4AXRsJcN9fpF7mVq4eK1CorBY+OOzOc+/yVBpKysdaV/yZ+ABEhX93B2kPLFSOPUKjSPK2rtqE6h2NSl5BFuGEoVBerKn+ymOnmE4/SDBSe5S6gIL5vwy5zNMsxWUaUF5XO9Ez+2v8+yPSvQydj3pw5Rlb07mAXcI18ZYGClO6g/aKL52KYnn1FZ/X3r8r/cibfDbuXC6FRfVXJmzikVUqZdTp0tOwPkh4V0R63l2RO9Luy7vG6rurANSFnUA9n842KkRtBagQeQC96dbC0ebhTj+NPmskklxr6/6Op/P7d+YY76WzvQMvnsCAwEAAQ==\n-----END PUBLIC KEY-----",
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
