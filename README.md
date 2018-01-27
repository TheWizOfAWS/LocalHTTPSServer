# LocalHTTPSServer
An easy to setup server that runs on localhost over https serving up static content.

Setup
1. Clone the git repository to a folder on your local machine.
2. Open the terminal and navigate to the folder that contains the LocalHTTPSServer
3. In the terminal enter: ./install.sh
4. The install script will install OpenSSL certificates.
5. Place static web page content in the www folder.

Starting the server
1. Open the terminal and navigate to the folder that contains the LocalHTTPSServer
2. In the terminal enter: ./startserver.sh
3. Open a browser window and navigate to the web page. The default domain is https://localhost:3000/

Requirements
Requires that Node.js is installed (https://nodejs.org/en/). The server was developed using Node.js version 8.9.1, but should work with newer versions.
The install and startserver scripts will run on Mac and Linux. It may also work on Windows Subsystem for Linux.

Notes: Since the certificate used is self signed browsers will give you a warning if you don't trust the certificate authority. If you don't trust the certificate then you will need to click advanced in most browsers and allow the page to load.
