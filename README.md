weatherApp 

Before starting the app:
- Create .env file using the pattern in .env.example and delete this one

Because the project use https, you have to create the key and the cert
To do that:
- first remove key.perm.example and cert.perm.example
- then, use the following commands in terminal:
  - openssl genrsa -out key.pem
  - openssl req -new -key key.pem -out csr.pem
  - openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
  - rm csr.pem

Now you can start the web app 

While in the app main folder, open the terminal and type:
- node server.js

Open the browser and digit:
https://localhost:3000

Good luck!