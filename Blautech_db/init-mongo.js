db.createUser(
    {
        user: "blautech",
        pwd: "blautech",
        roles: [
            {
                role: "readWrite",
                db: "blautech"
            }
        ]
    }
)