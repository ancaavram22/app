# Note Sharing App

This app will give you the possibility to share, organize and view notes with friends or other group members.

Users will be able to connect to the platform via a web application (React) or a mobile app (React Native).

They will have the option to register, edit profiles, view notes, submit notes, sort notes by category, manage groups and contact other users.

The gateway server is provided by API Gateway (AWS). It will provide the client applications with REST endpoints through which all of the above mentioned actions are enabled. 
The payloads will be encoded in JSON format, and the data transfer objects will mirror the entities stored in the database.

All user management actions (create user, change password, update profile) will be handled by Cognito (AWS).

The vast majority of data will be stored in MongoDB Atlas and the routes of access will be protected via AWS IAM User Roles and Policies.

# Backend
### Access Link: https://vcmvsska7c.execute-api.us-east-1.amazonaws.com/dev
### Commands:
 - cd backend
 - serverless deploy

# Frontend Web
### Access Link: http://razvantamsa-442266.s3-website-us-east-1.amazonaws.com/
### Commands:
 - serverless client deploy
