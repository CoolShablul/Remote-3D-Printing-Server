import axios from "axios";


export const sendOctoPrintPostRequest = async (path : string, options : any) => {
    // Make the POST request
    const octoPrintApiKey = process.env.OCTOPRINT_API_KEY || "";
    try {
        return await axios.post(path, options, {
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": octoPrintApiKey, // API Key for authentication
            },
        });
    } catch (error: any) {
        console.error(" failed to warm the bed", error.message);
        throw error;
    }
}


