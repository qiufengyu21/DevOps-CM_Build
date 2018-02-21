# csc519_milestone_1
Ansible script for provisioning iTrust2 on AWS.
Steps:
- npm install
- npm install aws-sdk
- node aws.js for creating a new AWS Ubuntu 14.04 instance
- ansible-playbook -i inventory build_iTrust.yml