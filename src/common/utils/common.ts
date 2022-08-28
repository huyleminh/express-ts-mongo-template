import moment = require("moment");

// Define all common functions here
function getCurrentTimeStamp() {
	return moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ");
}
const Common = {
	getCurrentTimeStamp,
};
export default Common;
