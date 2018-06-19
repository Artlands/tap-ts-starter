### AWS Deployment

- Platform: [**AWS**](https://aws.amazon.com) (Amazon Web Services) 

  - Prerequisite:
    1. [Amazon account](https://aws.amazon.com)
    2. [**AWS CLI**](https://aws.amazon.com/cli) (Command Line Interface): a unified tool to manage AWS services. [Install](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) and [Configure](<https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html>)

- Services:

  - [**IAM**](<https://aws.amazon.com/iam/>) (Identity and Access Management): Securely manage access to AWS services and resources. 
  - [**S3**](<https://aws.amazon.com/s3/>) (Simple Storage System): Object storage built to store and retrieve any amount of data from anywhere 
  - [**Lambda**](<https://aws.amazon.com/lambda/>) Run code without thinking about servers. Pay only for the compute time you consume. 

- Framework:

  - [**Serverless**](<https://serverless.com/>)

- How:

  - Create and attach policies 

    - Create "cloudformation" policy

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "Stmt1449904348000",
                  "Effect": "Allow",
                  "Action": [
                      "cloudformation:CreateStack",
                      "cloudformation:CreateChangeSet",
                      "cloudformation:ListStacks",
                      "cloudformation:UpdateStack",
                      "cloudformation:DescribeChangeSet",
                      "cloudformation:ExecuteChangeSet",
                      "cloudformation:DescribeStacks",
                      "cloudformation:DescribeStackResource",
                      "cloudformation:ValidateTemplate"            
                  ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

    - Create " FullAccess_APIGatewayRec" policy

      ```json
      {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "Stmt1467321765000",
                  "Effect": "Allow",
                  "Action": [
                      "apigateway:*"
                  ],
                  "Resource": [
                      "*"
                  ]
              }
          ]
      }
      ```

      - Go to group that you created for your user, go to permissions, attach policy, and attach the following policies:

      > "cloudformation" //manually created
      >
      > "FullAccess_APIGatewayRec" //manually created
      >
      > "AWSLambdaFullAccess"
      >
      > "IAMFullAccess"
      >
      > "AmazonS3FullAccess"
      >
      > "CloudWatchFullAccess"
      >
      > "CloudFrontFullAccess"
      >
      > "AWSCloudFormationReadOnlyAccess"

  - In file **serverless.yml** change bucket name to something **unique**. Example: "fdsa-trigger-bucket-unique" in any place you see "fdsa-trigger-bucket"

  - In file **serverless.yml** , under functions, for each function (filetrigger, hello), change handler to "dist/es/handler.[functionname]"

  - Navigate to project folder then run `npm run build`and then run `serverless deploy --aws-profile [profilename]` command

  - Go to **AWS Lambda service**, change region to oregon(or other region, depends on the region you specify in serverless.yml), select manage function. There should be two functions which are also found in your **handler.ts **source file

  - One of these functions listens for an event from AWS S3, this event happens when a file is dropped into a specific bucket in S3.

    - Go to **AWS S3 service**
    - You should find a bucket called "fdsa-trigger-bucket-unique", this is where you can drop a file that will be processed by the Lambda function.
    - Drop a file, Go to **AWS CloudWatch**, go to logs, go to the correct function, and you should see a log of the file that was dropped.