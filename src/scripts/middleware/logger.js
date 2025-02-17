"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("@/utils/logger");
const requestLogger = (req, res, next) => {
    const start = Date.now();
    // Log request
    logger_1.logger.info('Incoming request', {
        method: req.method,
        path: req.path,
        query: req.query,
        headers: req.headers,
        ip: req.ip
    });
    // Log response
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger_1.logger.info('Request completed', {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1EQUFnRDtBQUV6QyxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzdFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUV6QixjQUFjO0lBQ2QsZUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUM1QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07UUFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztRQUNwQixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7S0FDYixDQUFDLENBQUM7SUFFSCxlQUFlO0lBQ2YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDcEMsZUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM3QixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO1lBQzFCLFFBQVEsRUFBRSxHQUFHLFFBQVEsSUFBSTtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDO0FBeEJXLFFBQUEsYUFBYSxpQkF3QnhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vLi4vc3JjL3V0aWxzL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0TG9nZ2VyID0gKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgLy8gTG9nIHJlcXVlc3RcbiAgICBsb2dnZXIuaW5mbygnSW5jb21pbmcgcmVxdWVzdCcsIHtcbiAgICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgICBwYXRoOiByZXEucGF0aCxcbiAgICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcbiAgICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgICAgIGlwOiByZXEuaXBcbiAgICB9KTtcblxuICAgIC8vIExvZyByZXNwb25zZVxuICAgIHJlcy5vbignZmluaXNoJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydDtcbiAgICAgICAgbG9nZ2VyLmluZm8oJ1JlcXVlc3QgY29tcGxldGVkJywge1xuICAgICAgICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxuICAgICAgICAgICAgcGF0aDogcmVxLnBhdGgsXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiByZXMuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBgJHtkdXJhdGlvbn1tc2BcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBuZXh0KCk7XG59OyJdfQ==