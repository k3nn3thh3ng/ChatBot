const middlewareObj = {};

middlewareObj.authCheck = (req, res, next) => {
	if (req.user === undefined) {
		res.status(401).json({
			authenticated: false,
			message: "user has not been authenticated"
		});
	} else {
		next();
	}
};

middlewareObj.logErrors = (err, req, res, next) => {
	console.error(err.stack)
	next(err)
}

middlewareObj.clientErrorHandler = (err, req, res, next) => {
	if (req.xhr) {
		res.status(400).send({ error: 'Something failed!' })
	} else {
		next(err)
	}
}

middlewareObj.errorHandler = (err, req, res, next) => {
	res.status(400).json({
		message: err.message
	})
}

middlewareObj.wrap = (middleware) => (socket, next) => middleware(
	socket.request, 
	{}, 
	next
);

module.exports = middlewareObj;