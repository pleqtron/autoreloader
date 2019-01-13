# autoreloader
Simple Node / Socket.io based auto reloader for web developers. Currently only working for local websites. For remote websites you can add a reload delay to the `autoreloader.json` config, so you can upload changes first before autoreload take action.

## How to get running:


    $ git clone https://github.com/pleqtron/autoreloader.git
    $ cd autoreloader
    $ npm install
    $ npm run

To change the watch directory, just edit the `autoreloader.json` config file. See console output for including correct client js file.