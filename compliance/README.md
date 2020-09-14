# Compliance Automation Engineer Challenge

At Tanda, we maintain a number of templates for [Modern Awards](https://www.fairwork.gov.au/awards-and-agreements/awards/list-of-awards) which our customers can apply to automate their timesheet calculations. A key part of maintaining these templates is documenting the miniminum wages that can be paid as part of these awards, as well as any age-based adjustments to these.  

As an example, the [Clerks - Private Sector Award 2020](http://awardviewer.fwo.gov.au/award/show/MA000002#P413_32840), has 10 different employment levels,

![Wage Levels](https://github.com/TandaHQ/work-samples/blob/add-compliance-tech-challenge/compliance/Clerks%20Wage%20Levels.png)

which can be adjusted by any of the 7 age-based percentages.

![Age Percentages](https://github.com/TandaHQ/work-samples/blob/add-compliance-tech-challenge/compliance/Clerks%20Age-Based%20Percentages.png)

For this challenge, your goal is to write a Ruby (or Ruby on Rails) method which takes input of your choosing, and outputs a hash representing the combination of each wage level and age-based percentage as specified in the Clerks Modern Award above.  Your script should:

 - output an array of hashes, containing one hash for each level/age combination.  
 - follow the format ```{name: "string", minimum_age: int, maximum_age: int, hourly_rate: float (2dp)```
 - the name can follow any convention you like, so long as the level/age combination is identifiable
 - there should be no overlap of `minimum_age` and `maximum_age` between hashes
 - take as little input as possible (to reduce manual data entry)
 
 **Bonus Challenge**
  - use a type system such as [Sorbet](https://sorbet.org/) to explain how you would strongly type your method.  
