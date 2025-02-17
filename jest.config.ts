// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
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

export default config;