# Skycast, a WeatherApp Assignment Submission for Floworks

> - View the assignment Hosted on Vercel : [visit Vercel Link](https://skycast-weather-app-delta.vercel.app/)
> - GitHub Repository Link : [Open GitHub Repository](https://github.com/daminace325/Skycast-Weather-App)

## Installation and Run Application
To access the application locally, follow the steps given below.

- **Insatalltion**:
  - Clone/zip the repository
  - Create a .env file
  - Add your openWeatherMaps API Key from the [open weather maps API website](https://openweathermap.org/current)
  - Add the following API_KEY ```NEXT_PUBLIC_API_KEY=your_api_key ```
  - Open `skycast` directory in terminal and run following command.
> - `cd skycast`
  - Run the Following commands in terminal to install packages
> - ` npm i `


## Getting Started
  - For running the application:
> - run  ```npm run dev``` on the terminal
>  - Open [http://localhost:3000](http://localhost:3000) on your browser to view the application


  - For Frontend Unit Testing, run the ``` npm run test``` command



### About Project

- **Introduction**: SkyCast, a weather application allowing users to retrieve current weather information for any city using city name or the coordinates of the location as inputs.
- **Technologies used**: Next.js, Typescript, GitHub, Node, Express, TailwindCSS, jest, Vercel, openWeatherMap API .
- **Functionalities**:  
  - Takes the user's location (or user input) to retrieve current coordinates, and retrieve weather data with coordinates as inputs.
  - Takes the user input for city name, and user can also see suggestions regarding the name of city, if the user is not passing the coordinates input, retrieves weather data with city name as input.
  - Weather Data contains : Current Temperature, Feels Like Temperature, Humidity, Wind Speed, Visibility, description, date and time, city name, and weather icon .
  - After getting weather data, user can share the weather information.
  - Other features : Loading state, gradient colors, code reusability, comments for code description, unit testing and deployed link.
 
- **Error Handling**:  
  - Provides readable error messages for invalid inputs or errors in retrieving data using try/catch blocks and alert messages.
  - Backend error handling and error state management on frontend

- **Testing**: 
    - Implemented Unit testing using jest on the frontend WeatherData.test.tsx component and the weather.test.ts for backend api testing.
    - For integration testing, it is done on weatherFlow.test.tsx


## React out to me via, daminkhan325@gmail.com
## Thank You