# Pre-requisites
For details of the software you need to have installed prior to undertaking the SWE Programme, please see [SWE training pre-requisites](/curriculum/Bootcamp/FAQ#pre-reqs)

# Overview of Standards and Assessments 

Welcome to the Software Engineering Programme (SWE)! We are excited you are joining Multiverse to start your apprentice journey. Before you start, we want to give you a little more information on how you will be assessed and what the learning will look like. This programme is composed of the following: 

* __5 week Bootcamp:__ prepares you to enter the workplace ready for your first challenges. The course content covers the entire software stack and includes, Object Oriented Programming (OOP) using JavaScript, the Unified Modelling Language (UML), RESTful APIs, relational databases and rendering dynamic content in the browser. You will also be introduced to the basics of the software development life cycle and begin to understand the role of a software developer. Each lesson includes coding challenges and the final week of the Bootcamp culminates with a group project.

* __Module 1:__ In this module, you will focus on designing, building and optimising a front-end, with UX, Web accessibility and performance considerations. You will also learn how to critically evaluate and utilise front-end frameworks (such as Angular, React, Vue).

* __Module 2:__ The module builds and expands on the RESTful concepts introduced in the 5-week Bootcamp. As well as designing and developing APIs, you will secure endpoints using both Basic Authentication and OAuth. Concepts will be taught in a language independent manner to allow coding in the language/framework of your choice.  

* __Module 3:__ This module takes the output from the first half of the software development life cycle (tested software) and teaches the knowledge and skills needed to package and deploy that software into different environments. The module strikes a balance between understanding the theories and methodologies of software deployment and the set of technical skills to actually design and implement a deployment and maintenance strategy.

* __Module 4:__ This module introduces the Open Web Application Security Project (OWASP) Top Ten Web Application Security Risks and how to mitigate against them. By the end of this module, you will understand the impact of deploying insecure software and how to protect against the most common form of attacks at all stages of the software development lifecycle.

## How will you be assessed?

During your sessions with your coach you will work on a variety of assignments. Below is a list of some of the ways you may be assessed in the programme.  

* Pre-module self-study, to build knowledge for your upcoming sessions
* Short answer questions checking your understanding of software engineering concepts 
* Scenario based questions around your role as a developer 
* Questions evaluating your role in the business 
* Individual projects completed during a module 
* Group projects completing during a module 
* Independent assignments completed after a module to validate understanding

## Standards of Software Engineering

All the Bootcamp and Module content taught during the Software Engineering Programme is directly aligned with the [standards for the Level 4 Software Developer programme](https://www.instituteforapprenticeships.org/apprenticeship-standards/software-developer-v1-1) as designed by the Institute for Apprenticeships & Technical Education. Refer to this programme regularly to reflect on what you are learning and identify areas for development whilst on the job. The Knowledge, Skills and Behaviours for this standards are also summarised below: 

### Knowledge
* K1: all stages of the software development life-cycle (what each stage contains, including the inputs and outputs)
* K2: roles and responsibilities within the software development lifecycle (who is responsible for what)
* K3: the roles and responsibilities of the project life-cycle within your organisation, and your role
* K4: how best to communicate using the different communication methods and how to adapt appropriately to different audiences
* K5: the similarities and differences between different software development methodologies, such as agile and waterfall.
* K6: how teams work effectively to produce software and how to contribute appropriately
* K7: software design approaches and patterns, to identify reusable solutions to commonly occurring problems
* K8: organisational policies and procedures relating to the tasks being undertaken, and when to follow them. For example the storage and treatment of GDPR sensitive data.
* K9: algorithms, logic and data structures relevant to software development for example:- arrays- stacks- queues- linked lists- trees- graphs- hash tables- sorting algorithms- searching algorithms- critical sections and race conditions
* K10: principles and uses of relational and non-relational databases
* K11: software designs and functional or technical specifications
* K12: software testing frameworks and methodologies

### Skills
* S1: create logical and maintainable code
* S2: develop effective user interfaces
* S3: link code to data sets
* S4: test code and analyse results to correct errors found using unit testing
* S5: conduct a range of test types, such as Integration, System, User Acceptance, Non-Functional, Performance and Security testing.
* S6: identify and create test scenarios
* S7: apply structured techniques to problem solving, debug code and understand the structure of programmes in order to identify and resolve issues
* S8: create simple software designs to effectively communicate understanding of the program
* S9: create analysis artefacts, such as use cases and/or user stories
* S10: build, manage and deploy code into the relevant environment
* S11: apply an appropriate software development approach according to the relevant paradigm (for example object oriented, event driven or procedural)
* S12: follow software designs and functional or technical specifications
* S13: follow testing frameworks and methodologies
* S14: follow company, team or client approaches to continuous integration, version and source control
* S15: communicate software solutions and ideas to technical and non-technical stakeholders
* S16: apply algorithms, logic and data structures
* S17: interpret and implement a given design whist remaining compliant with security and maintainability requirements

### Behaviours
* B1: Works independently and takes responsibility. For example, has a disciplined and responsible approach to risk and stays motivated and committed when facing challenges
* B2: Applies logical thinking. For example, uses clear and valid reasoning when making decisions related to undertaking work instructions
* B3: Maintains a productive, professional and secure working environment
* B4: Works collaboratively with a wide range of people in different roles, internally and externally, with a positive attitude to inclusion & diversity
* B5: Acts with integrity with respect to ethical, legal and regulatory ensuring the protection of personal data, safety and security.
* B6: Shows initiative and takes responsibility for solving problems within their own remit, being resourceful when faced with a problem to solve.
* B7: Communicates effectively in a variety of situations to both a technical and non-technical audience.
* B8: Shows curiosity to the business context in which the solution will be used, displaying an inquisitive approach to solving the problem. This includes the curiosity to explore new opportunities, techniques and the tenacity to improve methods and maximise performance of the solution and creativity in their approach to solutions.
* B9: Committed to continued professional development.

# Frequently Asked Questions

## <a name="pre-reqs">What software do I need to install for the Bootcamp?
* [Node](https://nodejs.org/en/) (version which is recommended for most users)
* [VSCode](https://code.visualstudio.com/)
* [git](https://git-scm.com/)
* [SQLite3](https://www.sqlite.org/download.html)
* [DB Browser for SQLite3 ](https://sqlitebrowser.org/)
* Google Chrome
* You also need access to a GitHub repository

## <a name="createNewProject"></a> How do I create a new Node.js project for my lesson?
  1. Create a new directory to hold the lesson's work - do not use spaces or special characters in directory or filenames.. `cd` into it.
  1. Run `npm init` to create a new `package.json` file. Accept all defaults. The `package. json` file holds metadata relevant to the project such as the project's dependencies.
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
