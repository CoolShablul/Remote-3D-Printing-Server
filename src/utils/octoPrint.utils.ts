import axios from "axios";


export const sendOctoPrintPostRequest = async (path : string, options : any) => {
    // Make the POST request
    const octoPrintApiKey = (process.env.OCTOPRINT_API_KEY || "").trim();
    try {
        console.log("apiKey:", octoPrintApiKey);
        return await axios.post(path, options, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": octoPrintApiKey // API Key for authentication
            },
        });
    } catch (error: any) {
        const suffix = path.split("/").pop();
        console.error(`printer operation failed in ${suffix} with error: `, error.message);
        throw error;
    }
}


