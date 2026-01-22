# DummyJSON Products API Test Suite

A comprehensive TypeScript + Playwright API test suite for validating DummyJSON Products endpoints.

## Overview

This test suite covers all Products API endpoints from DummyJSON, including:
- **GET** endpoints: Get all products, single product, search, pagination, sorting, categories
- **POST** endpoints: Add new products
- **PUT/PATCH** endpoints: Update products
- **DELETE** endpoints: Delete products

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers (if not already installed):
   ```bash
   npx playwright install
   ```

## Running Tests

### Basic Commands

```bash
npm test                    # Run all tests
npm run test:ui            # Interactive UI mode (recommended for debugging)
npm run test:headed        # Run tests with browser visible
npm run test:debug         # Run tests in debug mode
npm run test:parallel      # Run with 4 workers for faster execution
npm run test:report        # View HTML test report
```

### Advanced Usage

```bash
# Run specific test file
npx playwright test tests/products-get.spec.ts

# Run tests matching a pattern
npx playwright test --grep "GET"

# Run with custom worker count
npx playwright test --workers=2

# Run in headed mode with UI
npx playwright test --ui --headed
```

## Viewing Test Results

### HTML Report

After running tests, view the interactive HTML report:

```bash
npm run test:report
```

The report includes:
- Test execution summary with pass/fail status
- Execution time for each test
- Error messages and stack traces
- Request/response details for API calls
- Test traces and screenshots

### Console Output

Test results are displayed in the console with:
- ✅ Passed tests
- ❌ Failed tests
- ⏱️ Execution time
- Summary statistics

### JSON Report

A JSON report is generated at `test-results.json` for CI/CD integration and programmatic access.

## Test Structure

```
tests/
├── api/
│   └── ProductsAPI.ts          # API client - encapsulates all API calls
├── builders/
│   └── ProductBuilder.ts       # Builder pattern for test data creation
├── helpers/
│   └── validators.ts            # Validation helpers for assertions
├── types.ts                     # TypeScript interfaces for API responses
├── products-get.spec.ts         # GET endpoint tests
├── products-post.spec.ts        # POST endpoint tests
├── products-put-patch.spec.ts  # PUT/PATCH endpoint tests
└── products-delete.spec.ts     # DELETE endpoint tests
```

## Design Patterns

### API Client Pattern

The `ProductsAPI` class centralizes all API calls, making tests cleaner and easier to maintain:

```typescript
const api = new ProductsAPI(request);
const product = await api.getProductById(1);
```

## Configuration

### Playwright Configuration

Located in `playwright.config.ts`:

- **Base URL**: `https://dummyjson.com`
- **Test Directory**: `./tests`
- **Timeout**: 30 seconds per test
- **Retries**: 2 in CI, 0 locally
- **Workers**: Configurable (default: CPU cores)
- **Reporters**: HTML, List, JSON

### TypeScript Configuration

Located in `tsconfig.json`:

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Source**: `./tests` directory

## Project Details

- **Framework**: Playwright Test
- **Language**: TypeScript
- **API**: DummyJSON Products API
- **Test Count**: 15+ test cases
- **Coverage**: All Products endpoints

## Design Decisions

### Why TypeScript?

TypeScript provides compile-time type checking and better IDE support, catching errors early and improving code maintainability.

### Why Playwright for API Testing?

While Playwright is known for browser automation, it excels at API testing with:
- Built-in request context
- Excellent error reporting
- Seamless test runner integration
- Unified framework for API and E2E testing

### Why Design Patterns?

The use of API Client, Builder, and Validator patterns improves:
- **Maintainability**: Changes in one place
- **Readability**: Cleaner test code
- **Reusability**: Shared components
- **Scalability**: Easy to extend

## Troubleshooting

### Tests Failing Due to Network Issues

- Check your internet connection
- Verify the API is accessible: `https://dummyjson.com/products`
- Check firewall/proxy settings

### Rate Limiting Errors

- Reduce worker count: `npx playwright test --workers=1`
- Add delays between tests if needed
- Run tests sequentially instead of parallel

### TypeScript Compilation Errors

- Ensure dependencies are installed: `npm install`
- Check TypeScript version compatibility
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Playwright Installation Issues

- Run: `npx playwright install --force`
- Check Node.js version compatibility
