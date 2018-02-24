[Milestone1](README.md) | [Configuring Jenkins Server](Jenkins.md) | [Configuring chekbox.io](Checkbox.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Jenkins Job Builder
----------------------------------

Following are the detailed report regarding steps involved to configure Jenkins build jobs. We have also included lessons learned and issues we faced during the implementation. Ansible playbook to setup build jobs [here.](/JenkinsSetup/setupJenkins.yml)

1. **Steps to configure Jenkins Build Jobs**
	
	We performed following steps to setup Jenkins Build Jobs.
	
	1. **Installing required softwares**
		
		To setup iTrust application we need few softwares to be installed on our machine. So as a first step we installed latest version of all these softwares. Following is the list of softwares.
		
		- **Java**
		
		- **Maven**
	
	2. **Install Jenkins**
	
		After that we install jenkins. 
	
	3. **Configure JVM Args**
	
		After that we configure JVM args so that the initial setup wizard is disabled. For that modify JVM args as `JAVA_ARGS="-Djava.awt.headless=true -Djenkins.install.runSetupWizard=false"`.
		
	4. **Create Groovy Scripts**
	
		After this we create [groovy scripts.](/JenkinsSetup/setupJenkins.yml) Which will create a default user with provided username and password. And then we copy this script to `/var/lib/jenkins/init.groovy.d/basic-security.groovy` location. After this we restart jenkins service.
		
	5. **Change install state of jenkins**
		
		After we have restarted jenkins we change the install state of jenkins to `INITIAL_SETUP_COMPLETED`.
		
	6. **Install Jenkins Plugins**
	
		As state of installation is `INITIAL_SETUP_COMPLETED`, we move forward to install plugins which will be needed to perform project milestone steps.

	7. **Run Jenkins**
	
		Now as we are completed all the setup steps we start the jenkins service. 
		
	8. **Access the server on browser**
	
		After we have started the jenkins, we can access the jenkins via browser to confirm proper setup . We need to go on `http://{{ ip_address }}:8080` address to access the jenkins server. Where `ip_address` is the IP address of the machine on which iTrust application is running.

	
2. **Issues faced**

3. **Learnings**

[<<< Previous](Jenkins.md) | [Next >>>](Checkbox.md)