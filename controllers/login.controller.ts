import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";
import AxiosServiceBackend from "services/backend/axios.service";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let axiosService = new AxiosServiceBackend();
        let { data } = await axiosService.login(
            req.body.username,
            req.body.password
        );
        res.json(data)
    } catch (error:any) {
        throw new Error(error.message);
    }
};

export default catchErrorsFrom(Login);
