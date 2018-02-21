var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: process.env.AWSaccessKeyId, 
                  secretAccessKey: process.env.AWSsecretAccessKey});
AWS.config.update({region: 'us-west-2'});

var ec2 = new AWS.EC2();

var params = {
   ImageId: 'ami-8f78c2f7', // Ubuntu Server 14.04 LTS (HVM), SSD Volume Type
			    // didn't use Ubuntu 16.04 because it doesn't have python2!
   InstanceType: 't2.micro',
   MinCount: 1,
   MaxCount: 1,
   KeyName: 'id_rsa'
};

ec2.runInstances(params, function(err, body) {
   if (err) {
      console.log("***ERROR***", err);
      return;
   }
   var instanceId = body.Instances[0].InstanceId;
   console.log("Instance created successfully with instance id: ", instanceId);
   var paramsForDI = 
		{
			InstanceIds: [instanceId]
		};

setTimeout(function(){ 
   ec2.describeInstances(paramsForDI, function(error, data)
		{
			if(error)
			{
				console.log("***ERROR*** - " + error + "\n");
			}
			else
			{
				var ipaddress  = data.Reservations[0].Instances[0].PublicIpAddress;
				console.log("IP Address: " + ipaddress);
				
			}
		});
});
}, 30000);
