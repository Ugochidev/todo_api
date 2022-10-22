const errorHandler = (err, req, res, next) => {
	const responseBody = {
		statusCode: 500,
		message: "An error occurred, please contact the system Admin",
	};
	switch (err.statusCode) {
		case 400:
			responseBody.statusCode = 400;
			responseBody.message = err.message;
			break;
		case 403:
			responseBody.statusCode = 403;
			responseBody.message = err.message;
			break;
		case 404:
			responseBody.statusCode = 404;
			responseBody.message = err.message;
			break;
		default:
			break;
	}

	return res
		.status(responseBody.statusCode)
		.json({ message: responseBody.message });
};

export default errorHandler;
