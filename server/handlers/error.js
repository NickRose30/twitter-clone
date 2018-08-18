const errorHandler = (error, request, response, next) => {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Something went wrong on the server.'
    }
  });
};

module.exports = errorHandler;