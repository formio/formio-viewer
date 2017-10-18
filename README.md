Form.io form viewer
--------------------------
This library serves as testing group for existing form.io projects. 

Installation and Launching
--------------------------
to get started simply follow the steps listed below. 

Make sure you have [Node.js](https://nodejs.org/en/) installed. (you 
can do this by typing node -v in your terminal)
Then run the following commands in the form-viewer active directory

    npm install
    gulp build 
    npm install -g http-server
    http-server dist
    
The terminal will alert you to visit localhost:8080. however you'll notice
that the page is blank, that's because you need to tell the viewer that 
Form.io project you'd like it to render. simply add your hash from 
portal.form.io. 

Example: http://localhost:8080/#/xpboxbyxuyobkli/awesomeproject
