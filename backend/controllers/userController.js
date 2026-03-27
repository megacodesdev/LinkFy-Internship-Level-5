const User = require("../models/User")

exports.getUsers = async () => {
    try {
        const clients = await User.find()
        if (clients.length > 0){
        console.log(`Found users: ${clients}`)} else {
            console.log("Ooops! You have no user in database")
        }
    } catch (error) {
        console.error("[Error]: Failed to get users", error)
    }
}

exports.createUser = async (req, res) => {
    const { fullNames, email, phone } = req.body
    console.log("BODY: ", req.body)
    try{

    const existingUser = await User.find({email})
    if (existingUser){
        console.log("This email has been already taken")
    }

    const user = new User({
        fullNames,
        email,
        phone
    })

    await user.save()
    console.log("User created successfully!")
} catch (err) {
    console.log("[Error]: User creation failed", err)
}
}