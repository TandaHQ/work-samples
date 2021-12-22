# Earnings Classifier Challenge

Welcome to the Earnings Classifier Challenge. First off, thanks for taking the time to give this challenge a go. We think it is a pretty fun, but let us know what you think when you're done. The challenge comprises of a series of tasks designed to help us evaluate a software developer's ability to:

  * Understand and extend an existing solution
  * Architect well defined database types
  * Create robust tests for critical functionality
  * Write scalable (performance) features

So if you want to impress keep these things in mind while architecting your solutions 🧐

# Development Environment

## System dependencies
  * Ruby 2.7.2 (simplest way would be to use [rvm](https://rvm.io/))
  * SQLite (should already be installed on macos, otherwise find it [here](https://www.sqlite.org/index.html))

## Setup
  * `bin/setup`

## Running the test suite
  * `bin/rails t`

# Background
This repository contains an incomplete and simplified version of our earnings classification algorithm. The algorithm enables businesses to automate the classification of worker's hours - removing a complex time consuming task, and removing human error that can leave workers with incorrect pay, and businesses prone to penalty or legal action.

An example scenario:
  > Consider a worker who completes a `45` hour week. This would commonly be classified as `40` _regular hours_ and `5` hours _overtime_. The overtime would usually be paid at a multiple (eg. 1.5x) of the regular hourly rate.

However there are many more cases where a business may classify compensation differently. This could be based on the business's country, industry, or own approach to compensation. The algorithm is designed to be configurable so we can accomodate many types of classification a business may require.

# The existing solution

### The algorithm

By calling `EarningsClassifier.new(timesheet).record!` the timesheet in question will have earnings recorded for its `Shift`s. The algorithm at a high level iterates through the `Shift`s. At each `Shift` it updates the `EarningContext` with the statistics necessary to classify the current `Shift`. It then iterates through the `HoursRule`s in order based on their rank, classifying the `Shift`'s hours as `Earning`s until all hours are allocated. It then iterates through all `AddonRule`s and creates `Earning`s for all applicable rules. See `app/models/earnings_classifier.rb` and `test/models/earnings_classifier_test.rb` to get a deeper understanding.

### Currently supported use cases
  * Hours after a threshold of hours in a shift (e.g. double time)
  * An addon after a threshold of hours in a shift (e.g. meal allowance)

### Existing models:
  * `EarningsClassifier` – Defines the algorithm itself
    * `EarningsContext` – Stores the context during timesheet classification
  * `Timesheet` – Contains a worker's shifts for a pay period
    * `Shift` – Records the duration of a worker's shift
      * `Earning` – An amount of compensation for a worker's shift
  * `EarningRule` – Specifies when a type of compensation is applicable for a shift
    * `HoursRule` – Delegates a shift's hours as a type of compensation
      * `HoursRuleConfig` – Contains the configuration of an hours rule
    * `AddonRule` – Adds an additional type of compensation to a shift
      * `AddonRuleConfig` – Contains the configuration of an addon rule
    * `EarningTest` – Specifies a test on when an earning rule is applicable
      * `MaximumHoursTest` – Determines if a threshold of hours has accumulated for a period
        * `MaximumHoursTestConfig` – Contains the configuration of a maximum hours test

# Task A

The current `MaximumHoursTest` supports classifying hours after a certain threshold for the shift (`DOUBLE_TIME`). It would be good if you specify a threshold to be applied based on the hours in the timesheet. This would add support for common use cases such as overtime (`OVERTIME`) for the week – i.e. the example scenario mentioned in background. If you run the test suite you will find some tests already given to you for this task, but you can also add more if you like.

# Task B

The second task involves designing a new type of earnings test. The utility of this test will be to classify hours on a specific day of the week – e.g. classifying Saturday hours as `SATURDAY` or Sunday hours as `SUNDAY`. Please also consider adding your own tests which verify the robustness of your solution. Tests should cover the allocating of hours on at least Saturday, Sunday, Friday overnight and Saturday overnight.

# Task C

At this point our algorithm supports a number of classification types but no effort has been made to make the algorithm scale well. As our product has became more popular it is becoming increasingly benificial to optimize the algorithm. For this task please remove any N+1's cases from the algorithm. If there are any other optimizations you can find please add them as well. If you run the test suite you will find some tests already given to you for this task, but you can also add more if you like.
