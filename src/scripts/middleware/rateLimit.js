"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZUxpbWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmF0ZUxpbWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUEyQztBQUU5QixRQUFBLFVBQVUsR0FBRyxJQUFBLDRCQUFTLEVBQUM7SUFDaEMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLGFBQWE7SUFDdkMsR0FBRyxFQUFFLEdBQUcsRUFBRSw2Q0FBNkM7SUFDdkQsT0FBTyxFQUFFO1FBQ0wsS0FBSyxFQUFFLG1FQUFtRTtLQUM3RTtJQUNELGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGFBQWEsRUFBRSxLQUFLO0NBQ3ZCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByYXRlTGltaXQgZnJvbSAnZXhwcmVzcy1yYXRlLWxpbWl0JztcblxuZXhwb3J0IGNvbnN0IGFwaUxpbWl0ZXIgPSByYXRlTGltaXQoe1xuICAgIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgLy8gMTUgbWludXRlc1xuICAgIG1heDogMTAwLCAvLyBMaW1pdCBlYWNoIElQIHRvIDEwMCByZXF1ZXN0cyBwZXIgd2luZG93TXNcbiAgICBtZXNzYWdlOiB7XG4gICAgICAgIGVycm9yOiAnVG9vIG1hbnkgcmVxdWVzdHMgZnJvbSB0aGlzIElQLCBwbGVhc2UgdHJ5IGFnYWluIGFmdGVyIDE1IG1pbnV0ZXMnXG4gICAgfSxcbiAgICBzdGFuZGFyZEhlYWRlcnM6IHRydWUsXG4gICAgbGVnYWN5SGVhZGVyczogZmFsc2UsXG59KTsiXX0=