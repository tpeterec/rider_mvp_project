# Rider: For motorcycle riders, by motorcycle riders

# Inspiration

As a fellow motorcycle rider, connecting with other riders in the community can be a hassle at times. The main avenues for connecting with other riders are typically outdated website forums or Facebook groups. I don’t know about you, but I barely touch Facebook as it is, except for Marketplace IF I’m selling something, and that's a big IF. Seeing dating apps take the romantic side of humanity by storm, I was inspired by their convenience, ease of use, and saw an opportunity to connect other motorcyclists together in the activity they love in the same format.

# Technologies & Languages Used:

Technologies: Express.js, Docker, RESTful APIs, PostgreSQL
Languages: JavaScript

# How to setup Docker containers:

The best way to use my application is through the docker containers I used for deployment. With the docker files and docker- compose file, you are able to run this application with a few simple steps.

1. Install Docker desktop and docker compose on your machine if not already. The links below are guides for both:
   Docker Desktop: https://www.docker.com/products/docker-desktop/
   compose: https://docs.docker.com/get-started/08_using_compose/

2. Verify that the docker-compose.yml file is within the project. It should be, but for some reason, if its not, this guide is great and simple: https://docs.docker.com/get-started/08_using_compose/

3. Start up the application stack using the docker compose up command. Add the -d flag to run everything in the background.

Command: docker compose up -d
Terminal Output should be:

Creating network "app_default" with the default driver
Creating volume "app_todo-mysql-data" with default driver
Creating app_app_1 ... done
Creating app_mysql_1 ... done

4. Check Docker Dashboard to ensure all containers are running.

5. In order to stop containers from running

Command: docker compose down

# How to use Rider

My blog post goes over the features of the app more in depth. So, instead of retyping, I will paste the link to my Medium blog post down below.

Link: https://medium.com/p/12995867ecf7

#Credits:
Many thanks to Lauren and William at Defense Unicorns along with Jarret, one of the SEIRs within Galvanize for helping me through this project, pointing me in the right direction and showing me what right looks like!

Please reach out to me if you have any questions of feedback! I am always learning.
