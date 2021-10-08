import "../styles/About.scss";

const About = () => {
  return (
    <div className="About container">
      <h1>About page</h1>
      <h3>Some information on how to use this page</h3>
      <h4>Filters</h4>
      <p>
        At the main page, you can see posts created from every user of this
        app. By default, posts with the highest upvote/downvote ratio will come
        on top. That's due to the "best" filter. You can change that behaviour
        using another filter. By clicking on the arrow near the rocket icon, a
        dropdown menu will appear. The "hot" filter will bring posts with most
        comments on top and the "fresh" filter will bring the newest posts on
        top.
      </p>
      <h4>Create Post</h4>
      <p>
        Between the navbar and the filters, there is an input item which has a
        placeholder "Create Post". By clicking on it, you will be led to another
        page where you will be able to create your post.
      </p>
      <h4>Profiles</h4>
      <p>
        Clicking on other users names, will lead you to their profiles. You
        can access your own using the link "Profile" inside the menu icon. You
        can edit your profile from there (upload image, add information about
        you).
      </p>
    </div>
  );
};

export default About;
