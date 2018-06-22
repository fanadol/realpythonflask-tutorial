DISCLAIMER: This application is based on Real Python tutorial
https://realpython.com/flask-by-example-part-1-project-setup/

WHAT IS THIS APPLICATION?
A Flask app that calculates word-frequency pairs based on the text from a given URL.

THING THAT INCLUDE IN THIS THIS TUTORIAL:
1. Beautiful Soup
2. Using Redis
3. Redis
4. Throbber (Loading)
5. Angular JS (scope, log, http)
6. Running 2 process in 1 dyno (Not recommended for large project)
7. Http post request without reload the page using Angular JS
8. Custom Angular Directive (Display Chart With JS and D3 Library)
9. D3 Library

REQUIREMENTS
1. Python runserver (python manage.py runserver)
2. Redis (src/redis-server)
3. Turn on the worker (python worker.py)

PROBLEM SOLVING:
1. AttributeError: 'NoneType' object has no attribute 'result_no_stop_words'
   - Check the database - The data is inserted, all the field is not none
   - job.result is returning none
   - Aha! I forget to add return result.id after commit to database
