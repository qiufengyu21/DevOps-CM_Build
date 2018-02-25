[Milestone1](README.md) | [Configuring Jenkins Server](Jenkins.md) | [Build Jobs](JenkinsJobBuilder.md)

[Configuring checkbox.io](Checkbox.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Configuring iTrust
----------------------------------

In post action of checkbox.io application [script](/final/post-build/itrust2-post-action.sh) runs and it runs [Ansible playbook](/final/post-build/itrust2-playbook.yml) to setup checkbox.io. Following are the steps performed in this playbook. As explained before these steps are performed on a droplet instance provisioned previously.
	
1. **Installing required softwares**
	
	To setup iTrust application we need few softwares to be installed on our machine. So as a first step we installed latest version of all these softwares. Following is the list of softwares.
	
	- **Java**
	
	- **Maven**
	
	- **MySQL**

2. **Change password for root user in MySQL and restart MySQL**

	We make changes in `/etc/mysql/my.cnf` file to change the password for root user to our desired password. After performing this step we restart the MySQL.

3. **Clone repo of iTrust**

	We cloned the [repo](https://github.ncsu.edu/engr-csc326-staff/iTrust2-v2) containing iTrust application from github to our local machine.
	
4. **Set Property Files**

	After we are done with cloning the repository we modify <br>`{{ repo location }}/iTrust2/src/main/resources/hibernate.properties.template` <br>/home/ubuntu/iTrust2-v2/iTrust2/src/main/java/db.properties.template <br> and <br>`{{ repo location }}/iTrust2/src/main/java/email.properties.template` files to reflect the password of root user which we set above. Here `repo_location` is the location where we cloned the iTrust repo.
	
6. **Download Tomcat**

	In this step we download Apache Tomcat web server and extract it from archive.
	
7. **Build Database**

	We need to build database to have some sample data which will be used in application. To build database and create sample data we run `mvn process-test-classes` command from ``{{ repo location }}/iTrust2` directory. Here `repo_location` is the location where we cloned the iTrust repo.

8. **Run iTrust**

	After we followed all these steps we need to start iTrust application. We do this by running `nohup bash -c "mvn jetty:run` command from ``{{ repo location }}/iTrust2` directory. Here `repo_location` is the location where we cloned the iTrust repo.
	
9. **Access the system on browser**

	After we have started the iTrust application successfully, we can access the iTrust system. We need to go on `http://{{ ip_address }}:8080/iTrust2` address to access the application. Where `ip_address` is the IP address of the machine on which iTrust application is running.

Following are the issues faced and learnings of this exercise.

**Issues faced**

We faced one issue while setting up iTrust application as described below.

1. **Insufficient Memory**

	When we ran the ansible script on VM configured manually it rant successfully. But when we ran the same script on a VM provisioned using digital ocean, application was failing ans it was not starting up.	As we start running application, the command got killed multiple times. From this we understood that VM was crashing because of insufficient memory. So we increased RAM for provisioned VM from 512 MB to 1024 MB. After making this change we could solve the issue mentioned above.
		
**Learnings**

1. **Memory Management and Resource Requirements**

	From the above issue we could learn the importance of memory management. And how such subtle differences can affect the execution of an application. We also learned that we must be aware of resource requirements of an application and we must provision servers based on such requirements.


[<<< Previous](Checkbox.md) | [Next >>>](Team.md)