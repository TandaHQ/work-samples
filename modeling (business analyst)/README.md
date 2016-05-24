Modeling
=================================

This task is a challenge for business analysts.

Tanda integrates with a wide variety of payroll software, and we are always adding new systems to the list. Many integrations are done through "flat files" - us exporting a CSV, text file, or similar, and the user entering that into the other system. But the best integrations are done through APIs.

Two APIs we integrate heavily with are those for [MYOB](http://developer.myob.com/) and [Xero](http://developer.xero.com/). Despite being totally different systems, there are a lot of things in common between their two APIs. After all, all payroll software fundamentally does the same stuff - manages the backend processes and final calculations around people getting paid.

Your challenge is to use information from MYOB and Xero's API documentation to design a data model in Tanda.

This challenge should take about one and a half to two hours to complete.

## Setting up

To start, have a look at MYOB and Xero's documentation for the Employee API endpoint:

* http://developer.myob.com/api/accountright/v2/contact/employee/
* http://developer.xero.com/documentation/payroll-api/employees/

You're encouraged to look at other endpoints on both sites too, these are just good starting points.

Almost all new Tanda customers are already using a payroll system, and often it's one of these. So the first step in signing up a new Tanda customer is importing their staff information from their payroll system in Tanda.

## The challenge

Your challenge is to design an Employee model for Tanda, using information from the APIs linked above.

In whatever format you think is most appropriate, document:

* What fields the Employee model in Tanda should have, and why
* How these fields will be imported from each API
* How the data for each field should be stored in Tanda
* What fields we won't need to import
* What fields should be used as primary keys or unique identifiers

Don't restrict yourself just to what fields are listed on the Employee endpoints in the Xero and MYOB API docs. Have a look at related endpoints, and think about what other information about employees would be useful and practical to include in Tanda.

Keep in mind that some employees may work at multiple companies that use both Xero/MYOB, and Tanda.

**Examples**

A field to include:

* Tanda should probably know an Employee's name
* In both Xero and MYOB, there are `FirstName` and `LastName` fields
* Tanda could either have a `Name` field, or `FirstName` and `LastName` fields
  * For the purpose of this task we don't mind which one of those options you choose, but you should have a reason as to why

A field to exclude:

* Xero has a field for the employee's `TwitterUserName`, but there aren't any obvious uses for this in Tanda, so it doesn't need to be imported at this stage

## Submitting your answer

You can write your answer in whatever format you like, for example in Google Sheets or Word. If you were emailed this task, just reply to whoever emailed it to you with the document attached or linked to. Otherwise send your answer to hr@tanda.co