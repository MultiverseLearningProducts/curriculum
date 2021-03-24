# Frequently Asked Questions

## <a name="createNewProject"></a> How do I create a new Node.js project for my lesson?
  1. Create a new directory to hold the lesson's work. `cd` into it.
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

## How do I run my Jest tests?
To run all your tests use `npm run test` or use `npm run test -t` to run a single test.
