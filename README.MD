<h1 align="center">Browse Stock OHLCV</h1>

<p align="center">The application displays the Open, High, Low, Close and Volume values along with a line and bar graph visualization for a given stock symbol/ticker on a given date handling appropriate edge cases.</p>

![Frontend](FrontendSmall.png)

### Want to watch how it works?
[Ckick Here](https://www.loom.com/share/9a3deb318c1c42ca838f018a570002cf?sid=d5bfe72c-31ce-45f1-8def-d87078d88c65)

![Frontend with output](FrontendSmallWithInput.png)

## Constraints

The application was designed based on following edge cases and constraints that I came up with.

## Edge cases checks on frontend before requesting

1. date range in picker to be restricted to last two years excluding current day as we only get the last 2 year's end of the day data for free version.
2. if user chooses saturdays and sundays display error and disable submit button as market is closed.
3. when some error occurs during fetch the user should know what happened in layman terms and should know whether to wait or proceed again, so display appropriate messages when error response from backend is recieved.
4. ondatachange clear screen of any error/previous output.
5. empty fields shouldn't be submitted make both input fields required.
6. Have necessary try and catch blocks when waiting for a response.

## Edge cases checks on backend before requesting/responding

1. convert stock symbol input to upper case before sending axios request as Polygon API recognizes only the uppercase form.
2. check if server response is ok.
3. if server response is ok then filter only the required fields from json object(Object destructuring is used) then send it to the frontend.
4. if server response is not ok get the status code, store the message/error and send it as response to the frontend.
5. Check if the stock symbol exists and then send request saving number of api calls(not able to complete because of the 5calls/min restriction - GetAllTIckets.js contains the code)
6. Have necessary try and catch blocks when waiting for a response.

## Components

> For the purpose of separation of concerns I have split the page into several components.

1. StockForm - To get the input values.
2. StockData - To display OHLCV values.
3. \*StockChart- To visualize the OHLC, neglecting the volume.

## API Responses

1. 403 we don't have access to that date.
2. 404 sunday or saturday or data not found due to some other reasons.
3. 429 5 calls/minute is utilized i.e., to many requests.
4. 200 response is ok.

## Feature Enhancement tasks

1. In order to improve the UX for a large user, we can have the following,
   1. load balancer such as Nginx to handle large incoming traffic.
   2. Design the UI to be responsive for all screen sizes(mobiles,Desktops, etc.,).
   3. Implement server-side caching to store frequently requested stock data.
   4. Utilize client-side caching to store data temporarily on the user's device.
   5. For charts and other data visualizations, we can have lazy loading.
   6. we can use CDN's to deliver static data fast.
   7. we can set up analytics and monitoring tools to track user behavior, identify bottlenecks, and gain insights to further improve the application's performance.
   8. we can add dark mode.
2. To Improve utility we can add new features such as,
   1. historical comparison with other stocks based on which the user can invest or sell.
   2. Price alerts where user can set a buy/sell price for a stock and recieve alerts when it drops below it.
   3. adding stock screener where user can filter based on yield or market cap
   4. add social sharing using which people can share interesting insights.
   5. create a user watchlist where users can watch they performance of favourite stocks like a feed without needing to search and understand.
