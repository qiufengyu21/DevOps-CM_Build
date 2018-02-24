[Milestone1](README.md) | [Build Jobs](JenkinsJobBuilder.md) | [Configuring chekbox.io](Checkbox.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Configuring Jenkins Server
----------------------------------

Following are the detailed report regarding steps involved to configure Jenkins server. We have also included lessons learned and issues we faced during the implementation.

1. **Steps to configure Jenkins Server**

	We performed following steps to setup Jenkins Server.
	
	1. **Installing required softwares**
		
		To setup iTrust application we need few softwares to be installed on our machine. So as a first step we installed latest version of all these softwares. Following is the list of softwares.
		
		- **Java**
		
		- **Maven**
	
	2. **Install Jenkins**
	
		After that we install jenkins. 
	
	3. **Configure JVM Args**
	
		After that we configure JVM args so that the initial setup wizard is disabled. For that modify JVM args as `JAVA_ARGS="-Djava.awt.headless=true -Djenkins.install.runSetupWizard=false"`.
		
	4. **Create Groovy Scripts**
	
		After this we create groovy scripts. Which will create a default user with provided username and password. And then we copy this script to `/var/lib/jenkins/init.groovy.d/basic-security.groovy` location. After this we restart jenkins service.
		
	5. **Change install state of jenkins**
		
		After we have restarted jenkins we change the install state of jenkins to `INITIAL_SETUP_COMPLETED`.
		
	6. **Install Jenkins Plugins**
	
		As state of installation is `INITIAL_SETUP_COMPLETED`, we move forward to install plugins which will be needed to perform project milestone steps.

	7. **Run Jenkins**
	
		Now as we are completed all the setup steps we start the jenkins service. 
		
	8. **Access the server on browser**
	
		After we have started the jenkins, we can access the jenkins via browser to confirm proper setup . We need to go on `http://{{ ip_address }}:8080` address to access the jenkins server. Where `ip_address` is the IP address of the machine on which iTrust application is running.

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