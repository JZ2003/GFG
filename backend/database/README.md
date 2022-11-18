# Notes on installing MongoDB

Go to here to install mongodb on your local machine
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition

```
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0
```

You can run MongoDB as a macOS service using brew, or you can run MongoDB manually as a background process. It is recommended to run MongoDB as a macOS service, as doing so sets the correct system ulimit values automatically (see ulimit settings for more information).

To run MongoDB (i.e. the `mongod` process) as a macOS service, run:

`brew services start mongodb-community@6.0`

To stop a mongod running as a macOS service, use the following command as needed:

`brew services stop mongodb-community@6.0`

To run MongoDB (i.e. the mongod process) manually as a background process, run:

For macOS running Intel processors:

`mongod --config /usr/local/etc/mongod.conf --fork`

For macOS running on 
Apple M1 processors:

`mongod --config /opt/homebrew/etc/mongod.conf --fork`

To stop a mongod running as a background process, connect to the `mongod` using 
`mongosh`, and issue the shutdown command as needed.

Both methods use the `mongod.conf` file created during the install. You can add your own MongoDB configuration options to this file as well.