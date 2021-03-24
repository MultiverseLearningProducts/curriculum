# Frequently Asked Questions

## <a name="createNewProject"></a> How do I create a new Node.js project for my lesson?
  1. Create a new directory to hold the lesson's work - do not use spaces or special characters in directory or filenames.. `cd` into it.
  1. Run `npm init` to create a new `package.json` file. Accept all defaults.
  1. Add any Node package dependencies you require using `npm install`. For the majority of Bootcamp assignments you will require:
     * `npm install jest`
  1. Modify your `package.json` to allow running of Jest tests and generation of test coverage reports:
  ```json
    "scripts": {
    "test": "jest",
    "test:report": "jest --coverage=true"
  }
  ```

## <a name="runJestTests"></a> How do I run my Jest tests?
To run all your tests use `npm run test` or use `npm run test -t` to run a single test.

## <a name="generateCoverage"></a> How do I create a Jest coverage report?
To create a Jest coverage report run `npm run test:report`.

You should see that Jest generates a 'coverage' report in your project folder under `/coverage/Icov-report/index.html`. Open this in your browser to view coverage by line, branch, function and statement.
