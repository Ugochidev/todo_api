const errorHandler = (err, req, res, next) => {
	responseBody = {
		statusCode: 500,
		message: "An error occurred, please contact the system Admin",
	};

	return res.status(responseBody.statusCode).json(responseBody);
};

export default errorHandler;