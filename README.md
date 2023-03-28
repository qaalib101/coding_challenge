<p align="center">
  <a href="https://coldclimate.com" target="blank"><img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+6Logotype_One_Color.svg" width="320" alt="Cold Climate Challenge" /></a>
</p>

## Description

For this coding challenge we would like you to build a simple web application that will allow a user to view and analyze their driving data. The application should be built using the following technologies:

- React
  - style using CSS (TailwindCSS preferred)
- Node.js NestJS, or NextJS (preferred)
- Typescript

Feel free to use any other libraries or frameworks that you feel will help you complete the challenge.  You are free to design the application as you see fit as long as it meets the requirements below.

- The driving data is located in the HOS_log.json file.

The application should have the following features:
- At least one API endpoint that will return the necessary data used by the UI
- A UI to display the driving data:
  - Provide a daily summary of hours worked
    - Calculate daily pay based on hours worked
    - Calculate overtime based on hours worked over 8 hours
  - Display a weekly summary of hours worked 
    - Calculate weekly pay based on hours worked
    - Calculate overtime based on hours worked over 40 hours
  - Display a way to indicate when a driver is in compliance with hours of service regulations
    - A driver cannot work more than 70 hours in a 7 day period without a 34 hour break
    - A driver cannot work more than 14 hours in a 24 hour period
    - A driver cannot work more than 11 hours after 8 hours of rest
    
## License

Nest is [MIT licensed](LICENSE).
