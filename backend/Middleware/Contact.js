const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${new Date().toISOString()}`);
    next(); // Pass control to the next middleware or route handler
  };
  
  export default loggerMiddleware;
  