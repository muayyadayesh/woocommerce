"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const logger_1 = require("../../utils/logger");
class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
        this.name = 'AppError';
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error('Error occurred', {
        error: err,
        path: req.path,
        method: req.method
    });
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
            details: err.details
        });
        return;
    }
    // Default error
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
    return;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1EQUFnRDtBQUVoRCxNQUFhLFFBQVMsU0FBUSxLQUFLO0lBQy9CLFlBQ1csVUFBa0IsRUFDbEIsT0FBZSxFQUNmLE9BQWE7UUFFcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSlIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUdwQixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7QUFURCw0QkFTQztBQUVNLE1BQU0sWUFBWSxHQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQ3JFLGVBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7UUFDM0IsS0FBSyxFQUFFLEdBQUc7UUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7UUFDZCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07S0FDckIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLFlBQVksUUFBUSxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVCLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsT0FBTztJQUNYLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakIsS0FBSyxFQUFFLHVCQUF1QjtRQUM5QixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTO0tBQzVFLENBQUMsQ0FBQztJQUVILE9BQU87QUFDWCxDQUFDLENBQUM7QUF0QlcsUUFBQSxZQUFZLGdCQXNCdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvclJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi8uLi9zcmMvdXRpbHMvbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIEFwcEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc3RhdHVzQ29kZTogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgZGV0YWlscz86IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0FwcEVycm9yJztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBlcnJvckhhbmRsZXI6IEVycm9yUmVxdWVzdEhhbmRsZXIgPSAoZXJyLCByZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGxvZ2dlci5lcnJvcignRXJyb3Igb2NjdXJyZWQnLCB7XG4gICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgIHBhdGg6IHJlcS5wYXRoLFxuICAgICAgICBtZXRob2Q6IHJlcS5tZXRob2RcbiAgICB9KTtcblxuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcHBFcnJvcikge1xuICAgICAgICByZXMuc3RhdHVzKGVyci5zdGF0dXNDb2RlKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgICAgIGRldGFpbHM6IGVyci5kZXRhaWxzXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47IFxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgZXJyb3JcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgIGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgICAgICAgbWVzc2FnZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBlcnIubWVzc2FnZSA6IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgcmV0dXJuOyBcbn07Il19