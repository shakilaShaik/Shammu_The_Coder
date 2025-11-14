export function pagination(userModel) {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5


            const startIdx = (page - 1) * limit

            const userList = await userModel
                .find()
                .skip(startIdx)
                .limit(limit).sort({_id:1})
                console.log("the user list is", userList);

            res.result = {
                page,
                limit,
                count: userList.length,
                data: userList,
            }

            next()
        } catch (error) {
            console.log("error from pagination", error)
            return res.status(500).json({ error: "Pagination error", details: error })
        }
    }
}

    