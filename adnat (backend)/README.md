# Adnat (Ruby on Rails challenge)

For this challenge you will be creating highly simplified version of the Tanda web app from scratch using [Ruby on Rails](https://rubyonrails.org/). This is a Ruby on Rails challenge, so don't worry about design too much. Just make sure it's usable. You should use Git as you build your solution. For submission you are asked to push your repo to GitHub and provide us with the link and any necessary instructions.

Your app is to have three models: users, organisations, and shifts. Your database layout should closely resemble the following [entity-relationship diagram](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation):

Figure 1:

![](https://i.imgur.com/w1YzNY6.png)

## How your app should work

The following illustrations should only serve as an example. You do not need to follow the designs presented below. You can split functionality out to other pages (e.g. a separate page for creating an organisation). Just make sure it is all there.

An unauthenticated user should first be prompted to log in, sign up, or reset their password:

Figure 2:

![](https://i.imgur.com/okK9Ojz.png)

As per Figure 1, users have names, so "Name" should be a field on your sign up page.

Figure 3:

![](https://i.imgur.com/P6ehdFS.png)

After signing up, users will not belong to an organisation, so when they log in for the first time, they should be prompted to join an organisation (or create a new one).

Figure 4:

![](https://i.imgur.com/5CTfYS7.png)

All users should be able to edit all organisations (i.e. their names and their hourly rates).

Figure 5:

![](https://i.imgur.com/XsXcduU.png)

Once a user has joined an organisation, the home page should change to become an overview of actions for that organisation: viewing shifts, editing the organisation as per Figure 5, or leaving the organisation.

Figure 6:

![](https://i.imgur.com/1o6OXt1.png)

Finally, the shift page should show shifts that belong to the user and their fellow employees at their organisation.

Figure 7:

![](https://i.imgur.com/OI0TKm9.png)

A few things to note:
* The hourly rate at Bob's Burgers in Figure 7 is $10/h.
* Your table should include all the columns in Figure 7, and should be ordered with the most recent shifts listed first.
* Breaks are considered unpaid and are thus subtracted from `shift length` to determine `hours worked` (which in turn determines `shift cost`):
  ```
  shift length = finish time – start time
  hours worked = shift length - break length
  shift cost = hours worked * organisation hourly rate
  ```
  `shift length` doesn't need to be displayed in the table, but `hours worked` and `shift cost` do.
* You will need to incorporate a way of creating a new shift for the user that is logged in. As with everything else, you don't need to copy the way it was done in the screenshot above.
* As per Figure 1, shift date and start time are to be stored in the same database column. Separating the two (and joining them together when you create a shift) is an exercise left to the reader.

### Optional exercises
Here are some optional exercises for you to do. We recommend that you try at least one of them. They are all mutually compatible, so you could do all of them.

#### 1. Users details (easy)
Allow users to change their own name, email address, or password.

#### 2. Modifying/Deleting shifts (easy)
Allow users to modify or delete existing shifts.

#### 3. Filtering shifts (medium)
Allow users to filter which shifts are visible based on employee or a date range or both.

#### 4. Overnight shifts (medium)
If the finish time of a shift is earlier than the start time, the shift should be considered overnight. For example, if the start time is 7:30pm and the finish time is 1:30am, then it is an overnight shift that goes for 6 hours.

#### 5. Penalty rates on Sundays (medium)
People should get paid 2x their hourly rate if they work on a Sunday. If you do exercise (4) then you will need to account for overnight shifts in the following manner: The 2x should only apply to the hours worked on Sunday. For the sake of simplicity, subtract the break length from the end of the shift. For example:

| start | finish | break length | shift cost (assuming $10 hourly rate) |
| - | - | - | - |
| 10pm Sunday | 3am Monday | 1 hour | $60 (5h at work – 1h break = 2h worked on Sunday and 2h worked on Monday) |
| 5pm Sunday | 2am Monday | 2 hours | $140 (9h at work – 2h break = 7h worked on Sunday) |
| 9pm Sunday | 1am Monday | 2 hours | $40 (4h at work – 2h break = 2h worked on Sunday) |

#### 6. Multiple breaks (tricky)
People often take more than one break when they work. For this exercise, instead of a shift having a single break length, it could have multiple. The sum of all these should be taken into account when calculating `hours worked` and `shift cost`.

#### 7. Multiple organisations (tricky)
Some people have 2+ jobs. Extend organisation functionality to allow users to have more than one organisation. You'll need to rethink the shifts model. Shifts currently belong to a user (who belongs to a single organisation). If there are multiple organisations involved, this falls apart, because you don't know which organisation the user worked the shift at.

#### 8. Your own idea
Feel free to add in a feature of your own devising. You're more than welcome to [sign up for a trial Tanda account](https://www.tanda.co/) to look for inspiration.

You will be judged on the the appropriate use of database constraints, your choice of data types, working data validation, and the general quality of your Ruby code. Be a show off! Impress us with your strong command of relational databases and idiomatic Ruby on Rails.
