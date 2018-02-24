[Milestone1](README.md) | [Configuring Jenkins Server](Jenkins.md) | [Configuring chekbox.io](Checkbox.md)

[Configuring iTrust](ITrust.md) | [Team Details](Team.md) | [Screencast](Screencast.md)

Jenkins Job Builder
----------------------------------

Following are the detailed report regarding steps involved to configure Jenkins build jobs. Ansible playbook to setup build jobs [here.](/JenkinsSetup/setupJenkins.yml)

1. **Steps to configure Jenkins Build Jobs**
	
	We performed following steps to setup Jenkins Build Jobs.
	
	1. **Installing required softwares**
		
		To setup jon builder application we need few softwares to be installed on our machine. So as a first step we installed latest version of all these softwares. Following is the list of softwares.
		
		- **Java**
		
		- **Maven**
		
		- **Python Pip**
		
		- **Node JS**
		
		- **MySQL**
		
		- **Jenkins Job Builder**
	
	2. **Copy Jobs Template**
	
		We copy the template of jobs files into `/var/lib/jenkins/jobs/` to this directory.
	
	3. **Build the Jobs**
	
		After jobs are copied we build the jobs. And after building is completed we run the post-build action.
		
	4. **Post Build Action**
	
		In this we run a [ansible script](post-action-playbook.yml) which provisions a VM and then other ansible scripts are run to set up respective system. These ansible scripts are explained in further sections. 
		
	5. **Steps to provision DO Instance**
		
		In this we first install doppy on the machine. Then we ensure that digital ocean keys exists. Then we create the droplet with desired specifications and then we instantiate the VM. After that we get the IP address of the droplet and we add that into the inventory file. After this step ansible scripts which are described in next sections run on the machine and we set up checkbox.io and iTrust systems.