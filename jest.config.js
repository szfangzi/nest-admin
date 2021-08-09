const type = process.env.TEST_TYPE;
let testRegex = '.*\\.spec\\.ts$';
if (type === 'E2E') {
  testRegex = '.e2e-spec.ts$';
}

// jest测试覆盖率branch(条件分支)数据有bug
module.exports = {
  collectCoverageFrom: [
    '**/user.service.(t|j)s',
    '!**/prisma.service.ts',
    '!**/*.filter.ts',
    '!**/*.guard.ts',
    '!**/*.decorator.ts',
    '!**/*.interceptor.ts',
    '!**/*.exception.ts',
    '!**/*.controller.ts',
    '!**/*.index.ts',
    '!**/*.module.ts',
    '!**/*.config.ts',
    '!**/*.dto.ts',
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.eslintrc.js',
    'jest.config.js',
    '/dist/',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@exceptions/(.*)$': '<rootDir>/src/exceptions/$1',
    '@config/(.*)$': '<rootDir>/src/config/$1',
    '@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '@modules/(.*)$': '<rootDir>/src/modules/$1',
    '@admin/(.*)$': '<rootDir>/src/modules/admin/$1',
    '@access/(.*)$': '<rootDir>/src/modules/admin/access/$1',
    '@auth/(.*)$': '<rootDir>/src/modules/auth/$1',
    '@common/(.*)$': '<rootDir>/src/modules/common/$1',
    '@guards/(.*)$': '<rootDir>/src/guards/$1',
    '@dtos/(.*)$': '<rootDir>/src/dtos/$1log',
  },
  rootDir: './',
  testEnvironment: 'node',
  testRegex,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
