# How to run
  - cd wattx/server && npm install && npm start
  - cd wattx && npm install && npm start (http://localhost:8081)

    A description of the problem and solution.

# Problem
  - Doesn't handle huge amount of data. A potential solution is pagination. 
  - Type safe. Typescript is an alternative.

# Technology choice
  - React eco system: Reactjs, redux, thunk over saga
  - Test: Jest for snapshot testing, Enzyme allows to travel and dom manipulation
  - Web framework: express, Hapi is another alternative 
  - Bundler tool: Webpack, a much simpler bundler tool than gulp
  - Styling: bulma, bulma template, scss, style component

# What's next
  - Dockerization
  - Server side rendering for better user experience
  - More unit test
  - Code spliting
  - Replace dev-server with server framework such as express or hapi
  - Scatter plot zoom in/out 
  - Responseiveness has rooms for improvement
