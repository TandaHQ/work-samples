# Adnat (Ruby on Rails challenge)

For this challenge you will be creating highly simplified version of the Tanda web app from scratch using [Ruby on Rails](https://rubyonrails.org/). This is a Ruby on Rails challenge, so don't worry about design too much (just make sure it's usable). All we are looking for here is great code. You should use git as you build out your solution. Submit with a link to a GitHub repo containing your work. Check out the video below to for a working demo of what we want you to build.

Your app is to have three models: users, organisations, and shifts. Your database layout should closely resemble the following [entity-relationship diagram](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model#Crow's_foot_notation):

Figure 1:

![](https://i.imgur.com/w1YzNY6.png)

## How your app should work

The following illustrations should only serve as an example. You do not need to follow the designs presented below. You can split functionality out to other pages (e.g. a separate page for creating an organisation). Just make sure it is all there.

An unauthenticated user should first be prompted to log in, sign up, or reset their password:

Figure 2:

![](https://i.imgur.com/03QlRMb.png)

Upon registration users will not belong to an organisation, so when they log in for the first time, they should be prompted to join an organisation (or create a new one).

Figure 3:

![](https://i.imgur.com/crhWnbK.png)

All users should be able to edit all organisations (i.e. their names and their hourly rates).

Once a user has joined an organisation, the home page should change to become a listing of all shifts at their organisation.

Figure 4:

![](https://i.imgur.com/bSU1kzA.png)

A few things to note:
* Shifts should be ordered with the most recent listed first.
* Breaks are considered unpaid and thus subtracted from the shift length to determine the shift cost.
* You will need to incorporate a way of creating a new shift for the user that is logged in. As with everything else, you don't need to copy the way it was done in the screenshot above.
* As per Figure 1, shift date and start time are to be stored in the same database column. Separating the two (and joining them together when you create a shift) is an exercise left to the reader.

### Optional exercises
Here are some optional exercises for you to do. We recommend that you try at least one of these. These are all mutually compatible, so you could do all of them.

#### 1. Users details (easy)
Allow users to change their own name, email address, or password.

#### 2. Swap organisations (easy)
After a user has joined an organisation, allow them to join (thereby leaving their current organisation) or edit existing ones, or create a new one, as in Figure 3.

#### 3. Overnight shifts (medium)
If the finish time of a shift is earlier than the start time, the shift should be considered overnight. For example, if the start time is 7:30pm and the finish time is 1:30am, then it is an overnight shift that goes for 6 hours.

#### 4. Penalty rates on Sundays (tricky)
People should get paid 2x their hourly rate if they work on a Sunday. If the shift goes overnight, the 2x should only apply to the hours worked on Sunday. For the sake of simplicity, subtract the break length from the end of the shift. For example:

| start | finish | break length | shift cost (assuming $10 hourly rate) |
| - | - | - | - |
| 10pm Sunday | 3am Monday | 1 hour | $60 (5h at work – 1h break = 2h worked on Sunday and 2h worked on Monday) |
| 5pm Sunday | 2am Monday | 2 hours | $140 (9h at work – 2h break = 7h worked on Sunday) |
| 9pm Sunday | 1am Monday | 2 hours | $40 (4h at work – 2h break = 2h worked on Sunday) |

If you don't do (3) then you won't need to account for this edge case.

#### 5. Multiple breaks (tricky)
People often take more than one break when they work. For this exercise, instead of a shift having a single break length, it could have multiple. The sum of all these should be taken into account when calculating the cost of the shift.

#### 6. Your own idea
Feel free to add in a feature of your own devising. You're more than welcome to [sign up for a trial Tanda account](https://www.tanda.co/) to look for inspiration.

You will be judged on the the appropriate use of database constraints, choice of data types, and the quality of your Ruby code. Be a show off! Impress us with your strong command of relational databases and idiomatic Ruby on Rails.
