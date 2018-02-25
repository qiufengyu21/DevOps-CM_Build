[Milestone1](README.md) | [Configuring Jenkins Server](Jenkins.md) | [Configuring chekbox.io](Checkbox.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Jenkins Job Builder
----------------------------------

As explained earlier [main.yml](/final/main.yml) is starting point of our project. And this playbook imports many other playbooks. We have explained playbooks which were used to setup and configure jenkins server in previous sections. In this section we will be explaining playbooks which are used to create and build jobs in jenkins.
	
1. [clideps.yml](final/tasks/clideps.yml)
	
	Purpose of this playbook is to install few client dependencies. We install pip and dopy (digital ocean api for ansible) through this playbook.
	
2. [appdeps.yml](final/tasks/appdeps.yml)

	In this playbook we install softwares which we need to build the jobs for checkbox.io and iTrust applications. Following are the tools which are being installed via this playbook.
	
	1. **NodeJS**
	
	2. **MySQL**
	
	3. **Maven**
	
3. [jobs.yml](final/tasks/jobs.yml)
	
	Purpose of this playbook is to create and run the jobs for checkbox.io and iTrust applications. Following steps are performed in this playbook.

	1. **Configure job for checkbox.io**
	
		Creates build job in jenkins server for building checkbox.io application using this[final/jobs/checkboxio-job.xml] job XML through cli JAR of jenkins. In this job XML we have defined SCM to define the github repo to get the source code. We have defined build steps. And on successful building of job we have configured a [script](/final/post-build/checkbox-post-action.sh) to be executed as post action using postbuildscript plugin.
	
	2. **Configure job for iTrust**
	
		Creates build job in jenkins server for building iTrust application using this[final/jobs/itrust2-job.xml] job template through cli JAR of jenkins.  In this job XML we have defined SCM to define the github repo to get the source code. We have defined build steps. And on successful building of job we have configured a [script](/final/post-build/itrust2-post-action.sh) to be executed as post action using postbuildscript plugin.
		
	3. **Run job for checkbox.io**
	
		Runs the created job for building checkbox.io application through cli JAR of jenkins.
		
	4. **Run job for iTrust**
	
		Runs the created job for building iTrust application through cli JAR of jenkins. 

After jobs have build successfully, their post-build action runs. In this above mentioned script runs and it runs command to run ansible scripts to provision servers and setup and buld the applications. This has been explained in further sections.

[<<< Previous](Jenkins.md) | [Next >>>](Checkbox.mds)