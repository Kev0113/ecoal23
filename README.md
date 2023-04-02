# ecoal23
## Daily Towner Newspaper App
![Manage_Article](https://user-images.githubusercontent.com/114187312/229382633-01608d19-5a34-4165-ace7-f2e498a1f10e.png)
![Search_Page](https://user-images.githubusercontent.com/114187312/229382635-95ed1d77-06a1-45be-af36-e026d765e22e.png)

Welcome to the Daily Towner Newspaper App repository. Our team has developed an application that provides users with the latest news, media, and features of the Daily Towner newspaper.

Features:
The Daily Towner app can be used either with a registered account or as a guest. The app provides access to short news articles with HTML content and media (photo, video or music). Tags can be associated with any article to facilitate a search feature.

## The application has two self-contained parts:

Origin Server Application: This part manages data stored in a SQLite database and a RESTful API acts as an interface with data (add, remove, search, etc.). This part of the application is done using the Laravel framework.
User-Agent Application: This is the user interface and will be written with React.js. It will display information coming from requests to the REST API of the origin server.
The user interface will contain several pages including a home page, search page, article page, register and login page, and an admin page. The app will allow users to add or delete articles and manage tags.

### Running the Application:
To run the Daily Towner Newspaper App, each team member is invited to clone the Git project and install the required packages for the client and server parts. To start the application, follow these steps:

- Install required packages for the client part with ** npm install ** in the dedicated directory.
- Install required packages and the database in the server part. Go to the dedicated directory of this part of the project and run ** php composer.phar install ** and ** php artisan migrate --seed **.
- To run the application, type in different terminal tabs: ** cd server; php artisan serve ** and ** cd client; npm start **
- Check your server application at localhost:8000 using your browser or a dedicated tool like Postman.
- Check your client application at localhost:3000.
We hope you enjoy using the Daily Towner Newspaper App. If you have any questions, feedback or suggestions, please don't hesitate to contact us.

Thank you for using Daily Towner!
