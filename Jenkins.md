[Milestone1](README.md) | [Build Jobs](JenkinsJobBuilder.md) | [Configuring checkbox.io](Checkbox.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Configuring Jenkins Server
----------------------------------

Following are the detailed report regarding steps involved to perform the first milestone of the project. Following steps explains all the playbooks that we have written and purposes of each one. We have also included lessons learned and issues we faced during the implementation of each section. Starting point of our project is [main](/final/main.yml) ansible playbook.

1. **Main Playbook**

	Pupose of this playbook is to setup all the variables that we are going to use in further playbooks. It also calls all other playbooks which we have written sequentially to achieve the desired results. Following are the strps performed in this playbbok.
	
	1. **Prompt User for credentials**
	
		In this step we ask github credentials of a user. We ask username and password which the user want to configure for jenkins. We also ask for DO token which will be used for provisioning of VMs.
		
	2. **Set Other Variables**
	
		After that we set some environment specific variables such as jenkins home, jenkins host, jenkins port etc.
		
	3. **Call multiple playbooks**
	
		After the above steps are done we finally call the number of playbooks sequentially. We have divided all tasks of this milestone across many modular ansible playbooks. And we call each one of them to execute the required tasks. We call following playbooks from this playbook.
		
		- **environment.yml**
		
		- **prereqs.yml**
		
		- **install.yml**
		
		- **setup.yml**
		
		- **plugins.yml**
		
		- **clideps.yml**
		
		- **appdeps.yml**
		
		- **jobs.yml**
	
2. **Subsequent Playbooks**

	Now we will explain each of the playbook that main playbook imports.
	
	1. [environement.yml](final/tasks/environment.yml)
	
		Purpose of this playbook is to just set environment variables. We set multiple environment variables which we are going to use across playbooks. We save Github username and password along with Digital Ocean token as environment variables.
		
	2. [prereqs.yml](final/tasks/prereqs.yml)
	
		To setup jenkins server we need Java to be installed on our machine as pre-requisite. So as a first step we installed Java on our machine. We also update apt package in this playbook.
		
	3. [install.yml](final/tasks/install.yml)
	
		Purpose of this playbook is to install jenkins. For this we first add apt-key, then we update jenkins source list and then finally we install jenkins.
	
	4. [setup.ym](final/tasks/setup.yml)
	
		Purpose of this playbook is to disable manual setup steps. After installing jenkins, when we first access it we need to create a user for configuration jenkins server. In this playbook by following following steps we disable that initial setup.
		
		- **Configure JVM Args**
	
			We configure JVM args so that the initial setup wizard is disabled. For that we modify JVM args as `JAVA_ARGS="-Djava.awt.headless=true -Djenkins.install.runSetupWizard=false"`.
		
		- **Create Groovy Scripts**
	
			After this we create groovy scripts from the [template](final/templates/jenkins_script.groovy.j2) that we have created. This script has variable for jenkins username and password and which we asked from user earlier. This script will create a specified user with provided credentials. Using template task after creation of this script it will be copied to `/var/lib/jenkins/init.groovy.d/basic-security.groovy` location.
			
		- **Restart Jenkins**
		
			After creating user we restart jenkins service to make these changes take effect.
		
		- **Disabling the initial setup wizard**
			
			As we have automated manual setup steps after we have restarted jenkins we change the install state of jenkins to `INITIAL_SETUP_COMPLETED`. Making this change will help in disabling the initial setup wizard.
		
	5. [plugins.yml](final/tasks/plugins.yml)
	
		Purpose of this playbook is to install required plugins for jenkins. Following are the actions performed in this playbbok.
		
		- **Download Jenkins Client JAR**
		
			We download Jenkins client JAR. This JAR is used in creating build jobs in future.
		
		- **Install Plugins**
			
			In this we install following plugins for jenkins.
			
			- maven-plugin
			
			- github
	  
			- postbuildscript
      
			- postbuild-task
		
		- **Restart Jenkins**
		
			After creating user we restart jenkins service to make these changes take effect.
			
	Now we can access jenkins via browser to confirm proper configuration and setup of jenkins server. We need to go on `http://{{ ip_address }}:8080` address to access the jenkins server. Where `ip_address` is the IP address of the machine on which iTrust application is running. These playbooks we used to setup jenkins server automatically without any manual intervention. Further playbooks are explained in next sections as those are related to building jobs and executing them.

2. **Issues faced**

	While setting up jenkins server, we face quite a lot of issues. Following are few of the prominent ones.
	
	1. **Disabling Initial Setup Wizard**
	
		We face issues in figuring out how to disable initial setup wizard. 
		
	2. **Creating default user**
	
		We face issues in creating default admin user for the system.

	3. **Installing Plugins**
	
		We also had hard time in figuring out how to install plugins required to complete the setup.
	
3. **Learnings**
	
	During this exercise we learned how useful it is to fully automate installation and configuration of any tool. This may save lots of time in manually configuring many servers with same details in actual production scenarios.
	
[<<< Previous](README.md) | [Next >>>](JenkinsJobBuilder.md)