[Milestone1](README.md) | [Configuring Jenkins Server](Jenkins.md) | [Build Jobs](JenkinsJobBuilder.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Configuring checkbox.io
----------------------------------

In post action of checkbox.io application [script](/final/post-build/checkbox-post-action.sh) runs and it runs [Ansible playbook](/final/post-build/checkbox-playbook.yml) to setup checkbox.io. Following are the steps performed in this playbook.
	
1. **Provisioning VM**

	In this playbook as a first step we call a [playbook](/final/post-build/provisioning-vm.yml) which is used to provision a VM, and further steps of this playbook run on that playbook. In provisioning playbook we perform following steps.
	
	1. **Key Setup**
	
		In this step we ensure that we have properly setup SSH keys to connect to digital ocean and create droplet instance.
	
	2. **Droplet Specification**
	
		Then we create a droplet with required specification.
	
	3. **Get IP**
	
		We then get the IP Address of created droplet.
	
	4. **Add Host in inventory**
	
		We then add the create droplet instance as a host in our inventory.
		
	5. **Wait for port opening**
	
		After 10 seconds, we wait for 300 seconds for port 22 to be open on created droplet instance. Now the droplet has been provisioned and further steps are carried out on that droplet instance to setup both checkbox.io and iTrust applications.
	
2. **Installing required softwares**
	
	To setup checkbox.io application we need few softwares to be installed on our machine. So as a first step we installed all these softwares. Following is the list of softwares.
	
	- **NodeJS**
	
	- **NPM**
	
	- **MongoDB**
	
	- **Git**
	
	- **Nginx**

3. **Clone repo of checkbox.io**

	We cloned the [repo](https://github.com/chrisparnin/checkbox.io.git) containing checkbox.io application from github to our local machine.

4. **Create User for MongoDB**

	We created a user for admin database in Mongodb.
	
5. **Set environment variables**

	Following environment variables are used in the checkbox.io application. We need to setup these variables with proper values to ensure the system runs without issues.
	
	- **MONGO_PORT:** This variable contains the value of port on which node application needs to be started. 
	
	- **MONGO_IP:** This is IP adress of machine on which MongoDB service is running.
	
	- **MONGO_USER:** This variable hold the username of the MongoDB user. This must be same as the username of user we created in above step.
	
	- **MONGO_PASSWORD:** This variable is for password for the MONGO_USER.
	
	- **MAIL_USER:** This is a email account username. 
	
	- **MAIL_PASSWORD:** Password for above email account.
	
	- **MAIL_SMTP:** SMPTP server used by the above email service provider.
	
6. **Copy nginx setup files from repo**

	We need to setup Nginx server to host our NodeJS application. So for that we copy `{{ repo location}}/checkbox.io/local-conf/nginx.conf` file from our repo to `/etc/nginx/nginx.conf` location. We also need to give address of our node application in this file. So we make that modifications. We also need to add our server in available site's list. So to achieve this we copy `{{ repo_location}}/checkbox.io/local-conf/default` file from our repo to `/etc/nginx/sites-available/default` location. In this file we need to give the path of HTML files which Nginx needs to render. So we make those modifications as well. Here `repo_location` is the location where we cloned the checkbox.io repo.
	
7. **Run NPM Install**

	We need to install dependencies which are required to run our node application. For that we run `npm install` command from the directory where our `package.json` file is present, i.e. `{{ repo location}}/checkbox.io/server-side/site/` directory. Here `repo_location` is the location where we cloned the checkbox.io repo.
	
8. **Starting services**

	After we have executed all above steps we are ready to start our application. For that we need to start following services in given order.
	
	- **MongoDB Service**
	
	- **Node Application**
	
	- **Nginx**

9. **Access the system on browser**

	After we start these services we can go to web browser and we can access the checkbox.io system. We need to go on `http://{{ ip_address }}:80` address to access the application. Where `ip_address` is the IP address of the machine on which checkbox.io application is running.
	
Following are the issues faced and learnings of this exercise.
	
**Issues faced**

Setting up checkbox.io was fairly simple process. During implementation of automating these tasks, we didn't face any major issues as such. 

**Learnings**

From this exercise we learned about setting servers in Nginx and benefits of Nginx over other web servers. Some of the benefits are enlisted below.

1. **Nginx makes website faster as compared to other web servers.**

2. **In Nginx more concurrent connections are handled as compared to other web servers (Apprx. 4 times more than Apache).**

3. **It has support for Load Balancing.**

4. **It is compatible with commonly-used web apps.**

[<<< Previous](JenkinsJobBuilder.md) | [Next >>>](ITrust.md)