class APICalls {
    static GET_ALL_USERS = async () => {
        const response = await fetch('/users');
        const body = response.json();
        console.log(body)
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    static GET_USER = async (id) => {
        const response = await fetch('/users/' + id.toString());
        const body = response.json();
        console.log(body)
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    static SAVE_USER = async (id, body) => {
        const response = await fetch('/users/' + id.toString(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const responseBody = response.json();
        console.log(responseBody)
        if (response.status !== 200) {
            throw Error(responseBody.message)
        }
        return responseBody;
    };

    static addNewUserFromGUser = (user) => {
       console.log((user.uid))
        const details = {
            displayName: user.displayName,
            email: user.email,
        };
        APICalls.SAVE_USER(user.uid, details).then((response) => {
            return response;
        }).catch(err => {
            throw Error(err)
        });
    }
}

export default APICalls