import {sendOctoPrintPostRequest} from "../utils/octoPrint.utils";

export const sendWarmUpBedTempRequest = (target : number) => {
    const options = {
        "command": "target",
        "target": target
    }
    const response = await sendOctoPrintPostRequest('http://localhost:5000/api/printer/bed', options);


}
