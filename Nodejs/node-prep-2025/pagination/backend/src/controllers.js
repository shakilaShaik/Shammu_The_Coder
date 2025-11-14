// export function pagination(userModel) {
//     return async (req, res, next) => {
//         try {
//             const page = parseInt(req.query.page) || 1
//             const limit = parseInt(req.query.limit) || 5


//             const startIdx = (page - 1) * limit
//             const endIdx = page * limit
//             let prevPage;
//             let nextPage;

//             if (endIdx < await userModel.countDocuments()) {
//                 nextPage = page + 1


//             }
//             if (startIdx > 0) {
//                 prevPage = page - 1

//             }
//       console.log("next page is",nextPage);


//             const userList = await userModel
//                 .find()
//                 .skip(startIdx)
//                 .limit(limit).sort({ _id: 1 })
//             console.log("the user list is", userList);

//             res.result = {
//                 page,
//                 limit,
//                 nextPage,
//                 prevPage,
//                 count: userList.length,
//                 data: userList,
//             }

//             next()
//         } catch (error) {
//             console.log("error from pagination", error)
//             return res.status(500).json({ error: "Pagination error", details: error })
//         }
//     }
// }

// cursor based pagination

import mongoose from "mongoose";

export function pagination(userModel) {
    return async (req, res, next) => {
        try {
            let query = {};
            let limit = parseInt(req.query.limit) || 5;

            let cursorNext = req.query.nextPage;
            let cursorPrev = req.query.prevPage;

            // ──────────────────────────────
            // 1. Build cursor filters
            // ──────────────────────────────
            if (cursorNext) {
                query._id = { $gt: new mongoose.Types.ObjectId(cursorNext) };
            }

            if (cursorPrev) {
                query._id = { $lt: new mongoose.Types.ObjectId(cursorPrev) };
            }

            // ──────────────────────────────
            // 2. Count total docs
            // ──────────────────────────────
            const totalDocs = await userModel.countDocuments();
            const totalPages = Math.ceil(totalDocs / limit);

            let users;

            // ──────────────────────────────
            // 3. NEXT PAGE PAGINATION
            // ──────────────────────────────
            if (cursorNext) {
                // fetch limit+1 for cursor detection
                users = await userModel
                    .find(query)
                    .sort({ _id: 1 })
                    .limit(limit + 1);

                let nextCursor = null;

                if (users.length > limit) {
                    nextCursor = users[limit]._id.toString(); // extra item cursor
                    users.pop(); // remove extra item
                }

                res.result = {
                    pageType: "next",
                    pages: totalPages,
                    count: users.length,
                    nextCursor,
                    data: users
                };

                return next(); // IMPORTANT
            }

            // ──────────────────────────────
            // 4. PREVIOUS PAGE PAGINATION
            // ──────────────────────────────
            if (cursorPrev) {
                users = await userModel
                    .find(query)
                    .sort({ _id: -1 })   // reverse direction
                    .limit(limit + 1);

                let prevCursor = null;

                if (users.length > limit) {
                    prevCursor = users[limit]._id.toString();
                    users.pop();
                }

                users.reverse(); // restore ASC order for UI

                res.result = {
                    pageType: "prev",
                    pages: totalPages,
                    count: users.length,
                    prevCursor,
                    data: users
                };

                return next();
            }

            // ──────────────────────────────
            // 5. FIRST PAGE (no cursor)
            // ──────────────────────────────
            users = await userModel
                .find({})
                .sort({ _id: 1 })
                .limit(limit + 1);

            let nextCursor = null;

            if (users.length > limit) {
                nextCursor = users[limit]._id.toString();
                users.pop();
            }

            res.result = {
                pageType: "first-page",
                pages: totalPages,
                count: users.length,
                nextCursor,
                data: users
            };

            return next();

        } catch (error) {
            console.log("Pagination error:", error);
            return res.status(500).json({ error: "Pagination error", details: error.message });
        }
    };
}

