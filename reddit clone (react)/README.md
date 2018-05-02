# Reddit Clone

This is a challenge for React/React Native developers. If you like React or React Native, doesn't matter if you specialise in more design
or logic development, this challenge is for you.

## The challenge

[Reddit](https://www.reddit.com/) looks okay... but we think you can remake it in your own image. Your challenge is to use the Reddit API
to build a Reddit clone, using either React, or React Native. There are a couple things we need to see and a couple that would be
interesting extensions if you're feeling adventurous.

Create an anonymous, 1 hour token [here](https://not-an-aardvark.github.io/reddit-oauth-helper/) and take a look at the 
[API docs](https://www.reddit.com/dev/api). If you want to implement full OAuth flow, you'll need to create a Reddit app through their
portal. 

Using something like [Create React App](https://github.com/facebook/create-react-app) will create all the React boilerplate for you and let
you get stuck into building something cool. 

You're welcome to use Reddit API wrappers like [snoowrap](https://github.com/not-an-aardvark/snoowrap) and component libraries like
[Semantic UI](https://semantic-ui.com/). API wrappers will do a lot of the heavy lifting for authentication and access, so it's recommended
that you use one.

If your submission requires that we drop in an anonymous authentication token, then please make it obvious in the readme where exactly we
should place a new token to test your solution.

##### Need:
1. A list view of the "hot" posts
   - https://www.reddit.com/dev/api#GET_hot
2. A view containing more information about an individual post (including comments for the post)
   - You should be able to share a link to this view so you can share the comments for a post to others using your clone.
    (Optional if building in React Native)
 
##### Extensions: (in no particular order)
1. Sorting of posts and comments (hot, top, new, controversial, etc)
2. Showing previews of videos and images if the post is a link to one of these things
3. Collapsing and expanding children comments in the post view
4. Up-voting and down-voting posts and comments
5. Commenting
6. Posting

The bottom three extensions will require you to implement OAuth, and will require a fair amount of extra work.
You'll need go to https://www.reddit.com/prefs/apps and create an application.

## Submitting your code

Package your code and instructions on how to run it alongside the files we've given you, and either upload them to your own repo, or
zip them and send them to careers@tanda.co.
