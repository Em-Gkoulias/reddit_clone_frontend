# UI Part - Still Under Construction

This project is going to b a Reddit clone. It is separated in two parts, one that contains the API and one that contains the UI.

This is the UI part. It is completely made using ReactJs and I have used react-router-dom in order to handle routing. All API request are made with axios. 

The user needs to create an account in order to be able to enter the website. After that a main page will appear with all the posts that have been created by users. There are three filters that allows user to choose what posts to appear on top. The default one is the "Best" filter which brings on top the posts that have best upvotes/downvotes score. The second one is the "Hot" filter that brings on top the posts that have the most comments and the last one is the "Fresh" which brings on top the latest posts. Each user can edit his profile image and add some text about him, see other people profiles, add comments to posts,create his own posts as well as upvote or downvote posts. 

# Need to be done
- Make sure that the email address in register page is not just some text but has the proper email syntax
- Complete the about page which provides iformation about the page
- Use datetime in order to show the users when each post and comment was created
- Add default image to users when they have not add one
- Create communities just like Reddit and add each post on a category
