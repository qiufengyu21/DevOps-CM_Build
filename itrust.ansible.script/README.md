# Ansible_For_iTrustv2
Ansible script for provisioning iTrust2 on AWS.

Steps:
- npm install
- npm install aws-sdk
- node aws.js for creating a new AWS Ubuntu 14.04 instance
- ansible-playbook -i inventory build_iTrust.yml
- go to IP_Address:8080/iTrust2 (http://54.218.30.75:8080/iTrust2)