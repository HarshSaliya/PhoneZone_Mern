"To successfully run this project, follow these steps:"


Installation Guide: All project-related packages are listed in the package.json file. The frontend and backend have different packages.

Guide for Admin Login: To create a user admin, open the database and set isAdmin to true; by default, it is false.

After logging in as an admin, you can manage products.

In the images section, we don't provide a direct upload button; instead, we manually specify the path. 
Therefore, you need to upload images to the upload directory, and then use that image path in the product table, 
like uploads/iphone16.jpg.


!! DATA !!

Data Files: For this project, we provide JSON files located in the frontend/public folder:

Phone Model: phonedata.json
User Model: userdata.json
Cart Model: cartdata.json
Simply import these files into MongoDB to view the data directly on the website.
