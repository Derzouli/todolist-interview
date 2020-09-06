DONE
- add create, read, update delete items
- basic test for items
- memory in cache
- use strict mode ECMA 5
- operation in db done only in one place. utils.js => migrate to a models if time
- create read update delete lists

SCOPE
- cant add more than 100000 items per list
- max 1m keys limit in cache memory

TODO
- update list
- ajax call to refresh getallItems or getLists => hash node-cache value and compare with client browser
=> if change refresh page
- add css
- add update list

NICE TO HAVE
- jest dont call internal function, mock functions

To Test:
type command: npm test

To Start web server:
type command: npm start
