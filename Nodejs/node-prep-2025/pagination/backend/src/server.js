import express from 'express'
import { connctDB } from './DB.js'
import { User } from './Model.js'
import { pagination } from './controllers.js'

const app = express()
const users = [
    {
        name: "shammu",
        age: "24"
    },
    {
        name: "shammu1",
        age: "24"
    },
    {
        name: "shammu2",
        age: "24"
    },
    {
        name: "shammu3",
        age: "24"
    },
    {
        name: "shammu5",
        age: "24"
    },
    {
        name: "shammu6",
        age: "24"
    },
    {
        name: "shammu7",
        age: "24"
    },
    {
        name: "shammu8",
        age: "24"
    },
    {
        name: "shammu9",
        age: "24"
    },
    {
        name: "shammu10",
        age: "24"
    },
    {
        name: "shammu11",
        age: "24"
    }, {
        name: "shammu12",
        age: "24"
    }, {
        name: "shammu13",
        age: "24"
    }, {
        name: "shammu14",
        age: "24"
    }, {
        name: "shammu15",
        age: "24"
    }, {
        name: "shammu16",
        age: "24"
    }, {
        name: "shammu17",
        age: "24"
    }, {
        name: "shammu18",
        age: "24"
    }, {
        name: "shammu19",
        age: "24"
    }, {
        name: "shammu20",
        age: "24"
    }, {
        name: "shammu21",
        age: "24"
    }, {
        name: "shammu22",
        age: "24"
    }, {
        name: "shammu23",
        age: "24"
    }, {
        name: "shammu24",
        age: "24"
    }, {
        name: "shammu25",
        age: "24"
    }, {
        name: "shammu26",
        age: "24"
    }, {
        name: "shammu27",
        age: "24"
    }, {
        name: "shammu28",
        age: "24"
    },

]

const createUSer = async () => {

    if (await User.countDocuments() === 0) {
        try {
            const res = await User.create(users)
            //  console.log("models are created", res);
        } catch (error) {
            console.log(error);
        }
    }

}
createUSer()

app.get("/", (req, res) => {
    console.log("hello iam a server");
    res.send("the server is running")
})
app.get("/users", pagination(User), (req, res) => {
    res.json(res.result)
})



app.listen(3000, () => {
    console.log("the app is running");
})




