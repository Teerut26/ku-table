import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";
import AxiosServiceBackend from "services/backend/axios.service";

const Profile = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        throw new Error("Token not found");
    }
    try {
        let axiosService = new AxiosServiceBackend();
        let imageBaseUrl = await axiosService.getImage(token  as string);
        res.send(imageBaseUrl);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default catchErrorsFrom(Profile);
