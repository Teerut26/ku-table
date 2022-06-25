import db from "config/firestoreAdmin";
import catchErrorsFrom from "libs/_utils/errors";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const CreateLinkController = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let id = uuidv4();
    const linkRef = db.collection("links").doc(id);
    await linkRef.set({
        id,
        ...JSON.parse(req.body.data),
    });

    return res.status(200).json({ id });
};

export default catchErrorsFrom(CreateLinkController);
