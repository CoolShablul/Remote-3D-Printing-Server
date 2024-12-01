import axios from "axios";


export const sendOctoPrintPostRequest = async (path : String, options : any) => {
    // Make the POST request
    try {
        const response = await axios.post(path, options, {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "", // API Key for authentication
            },
        });
    } catch (error) {
    }
}


