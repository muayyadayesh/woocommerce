"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.validateRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            res.status(400).json({
                error: 'Validation error',
                details: errorMessages
            });
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
// Validation schemas
exports.schemas = {
    importRequest: joi_1.default.object({
        websiteUrl: joi_1.default.string().uri().required(),
        consumerKey: joi_1.default.string().required(),
        consumerSecret: joi_1.default.string().required()
    }),
    queryParams: joi_1.default.object({
        websiteUrl: joi_1.default.string().uri().required()
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsOENBQXNCO0FBRWYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUF3QixFQUFFLEVBQUU7SUFDeEQsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBUSxFQUFFO1FBQzdELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsVUFBVSxFQUFFLEtBQUs7WUFDakIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixLQUFLLEVBQUUsa0JBQWtCO2dCQUN6QixPQUFPLEVBQUUsYUFBYTthQUN6QixDQUFDLENBQUM7WUFDSCxPQUFPO1FBQ1gsQ0FBQztRQUVELElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBbEJXLFFBQUEsZUFBZSxtQkFrQjFCO0FBRUYscUJBQXFCO0FBQ1IsUUFBQSxPQUFPLEdBQUc7SUFDbkIsYUFBYSxFQUFFLGFBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEIsVUFBVSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDekMsV0FBVyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsY0FBYyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDMUMsQ0FBQztJQUVGLFdBQVcsRUFBRSxhQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3BCLFVBQVUsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQzVDLENBQUM7Q0FDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuXG5leHBvcnQgY29uc3QgdmFsaWRhdGVSZXF1ZXN0ID0gKHNjaGVtYTogSm9pLk9iamVjdFNjaGVtYSkgPT4ge1xuICAgIHJldHVybiAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5LCB7XG4gICAgICAgICAgICBhYm9ydEVhcmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHN0cmlwVW5rbm93bjogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gZXJyb3IuZGV0YWlscy5tYXAoZGV0YWlsID0+IGRldGFpbC5tZXNzYWdlKTtcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogJ1ZhbGlkYXRpb24gZXJyb3InLFxuICAgICAgICAgICAgICAgIGRldGFpbHM6IGVycm9yTWVzc2FnZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dCgpO1xuICAgIH07XG59O1xuXG4vLyBWYWxpZGF0aW9uIHNjaGVtYXNcbmV4cG9ydCBjb25zdCBzY2hlbWFzID0ge1xuICAgIGltcG9ydFJlcXVlc3Q6IEpvaS5vYmplY3Qoe1xuICAgICAgICB3ZWJzaXRlVXJsOiBKb2kuc3RyaW5nKCkudXJpKCkucmVxdWlyZWQoKSxcbiAgICAgICAgY29uc3VtZXJLZXk6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgICAgICBjb25zdW1lclNlY3JldDogSm9pLnN0cmluZygpLnJlcXVpcmVkKClcbiAgICB9KSxcblxuICAgIHF1ZXJ5UGFyYW1zOiBKb2kub2JqZWN0KHtcbiAgICAgICAgd2Vic2l0ZVVybDogSm9pLnN0cmluZygpLnVyaSgpLnJlcXVpcmVkKClcbiAgICB9KVxufTsiXX0=