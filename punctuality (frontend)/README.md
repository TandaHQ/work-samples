Punctuality
=================================

This task is a challenge for front end engineers and developers.

Included in this package is a small Ruby web server, which returns data about rosters and shifts for a fictional person. Your task is to design and build a small widget that shows information about this person's punctuality.

This is a feature that already exists in Tanda. Managers love it because it makes it easy to spot and reward high performing staff. Employees love it, because punctuality is so crucial in many industries we work with, and it makes it easy for them to track their progress. The feature as we have it looks like this:

![The current punctuality module](example.gif)

We are interested in your ability to build the features in this gif. You can copy the design exactly, or you can make any changes you like to how it looks.

This challenge should take about one and a half to two hours to complete.

## Setting up

The file `punctuality.rb` has instructions on how to get the server running. Note that we don't expect you to have used [Ruby](https://www.ruby-lang.org/en/) before today. For this task you'll just need to install it and run a simple program, not write any new code in it.

If you get stuck getting the server running, try Googling the error message, but feel free to email us if you hit a roadblock. Troubleshooting your errors, and knowing when to ask for help, are equally useful skills.

## The challenge

Once your server is set up, you should be able to visit it through a browser and see JSON data. Your next step is to start building the punctuality widget. The screenshot above includes quite a few features, which we've split into simple and advanced:

**Basic features**

- Display rostered times for specific dates
- Display if corresponding actual time was on time, or if there was an issue with it
- Hover over actual time comment to see what the actual time was

**Advanced features**

- Date picker ("This Pay Period", also allows custom date selection)
- Pagination ("Show [25] shifts" / "Showing 1 to 5 of 5 shifts")
- Handling of shifts/rosters with some times missing (just indicate that in the UI, "no finish time clocked")
- Summary of times, through textual summary ("Mike is punctual 80% of the time"), chart, and summary of results ("punctual: 8, left early: 2")

Your task is to build the 3 basic features, and then at least 1 advanced feature (though we'd encourage you to try as many as you like!). You're also encouraged to write tests where appropriate.

We use the following general purpose frameworks/libraries at Tanda. Feel free to use any of these in your task. We'd prefer if you didn't introduce any new ones:

- jQuery
- Underscore (Lodash is also okay)
- Bootstrap
- d3.js
- QUnit (other test frameworks are okay)

You're welcome to build more than 3 features, but won't be penalised for not doing so. We're more interested in what your code looks like than how much of it you write.

## Submitting your code

Your code will probably be a HTML file, some JavaScript files, and some CSS files. Please package those alongside the files we've given you (this file, the Ruby server, etc) in a zip archive and email that to us. If you were emailed this task, just reply to whoever emailed it to you. Otherwise send it to developers@tanda.co