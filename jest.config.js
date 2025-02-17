"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    verbose: true,
    setupFiles: ['<rootDir>/src/tests/setup.ts'],
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQU0sTUFBTSxHQUEwQjtJQUNsQyxNQUFNLEVBQUUsU0FBUztJQUNqQixlQUFlLEVBQUUsTUFBTTtJQUN2QixLQUFLLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDeEIsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO0lBQzNCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGlCQUFpQixFQUFFLFVBQVU7SUFDN0IsaUJBQWlCLEVBQUU7UUFDZixNQUFNLEVBQUU7WUFDSixRQUFRLEVBQUUsRUFBRTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxVQUFVLEVBQUUsRUFBRTtTQUNqQjtLQUNKO0lBQ0Qsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDbEQsT0FBTyxFQUFFLElBQUk7SUFDYixVQUFVLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztDQUMvQyxDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gamVzdC5jb25maWcudHNcbmltcG9ydCB0eXBlIHsgQ29uZmlnIH0gZnJvbSAnQGplc3QvdHlwZXMnO1xuXG5jb25zdCBjb25maWc6IENvbmZpZy5Jbml0aWFsT3B0aW9ucyA9IHtcbiAgICBwcmVzZXQ6ICd0cy1qZXN0JyxcbiAgICB0ZXN0RW52aXJvbm1lbnQ6ICdub2RlJyxcbiAgICByb290czogWyc8cm9vdERpcj4vc3JjJ10sXG4gICAgdGVzdE1hdGNoOiBbJyoqLyoudGVzdC50cyddLFxuICAgIGNvbGxlY3RDb3ZlcmFnZTogdHJ1ZSxcbiAgICBjb3ZlcmFnZURpcmVjdG9yeTogJ2NvdmVyYWdlJyxcbiAgICBjb3ZlcmFnZVRocmVzaG9sZDoge1xuICAgICAgICBnbG9iYWw6IHtcbiAgICAgICAgICAgIGJyYW5jaGVzOiA4MCxcbiAgICAgICAgICAgIGZ1bmN0aW9uczogODAsXG4gICAgICAgICAgICBsaW5lczogODAsXG4gICAgICAgICAgICBzdGF0ZW1lbnRzOiA4MCxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIG1vZHVsZUZpbGVFeHRlbnNpb25zOiBbJ3RzJywgJ2pzJywgJ2pzb24nLCAnbm9kZSddLFxuICAgIHZlcmJvc2U6IHRydWUsXG4gICAgc2V0dXBGaWxlczogWyc8cm9vdERpcj4vc3JjL3Rlc3RzL3NldHVwLnRzJ10sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il19