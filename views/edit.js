<%- include("./partials/header") %>

<div class="ui main text container segment">
    <div class="ui huge header">Edit <%= blog.title %></div>

    <form class="ui form" action="/blogs/<%= blog._id %>?_method=PUT" method="POST">
        <div class="field"><input type="text" name="blog[title]" value="<%= blog.title %>"></div>
        <div class="field"><input type="text" name="blog[image]" value="<%= blog.image %>"></div>
        <div class="field">
            <label>Blog Content</label>
            <textarea name="blog[body]"><%= blog.body %></textarea>
        </div>
        
        <input class="ui violet big basic button" type="submit">
    </form>

</div>


<%- include("./partials/footer") %>