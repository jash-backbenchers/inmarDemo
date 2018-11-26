# inmar-demo

> A product management and Hierarchical data visualisation application

## Build Setup

``` bash
# start mongodb
mongod

# install client dependencies
cd public           (~root/public)
npm install

# build frontend for production with minification
npm run build       (~root/public)

# install server dependencies
cd ..               (~root/)
npm install         

#load data into mongodb
npm run load        (~root/)

#start server
node .               (~root/)

#Browse application
http://localhost:4000
# inmarDemo
# inmarDemo
