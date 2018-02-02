openssl genrsa -out LocalHostRootCA.key 2048
openssl req -x509 -new -nodes -config server.cnf -key LocalHostRootCA.key -sha256 -days 1024 -out LocalHostRootCA.pem

openssl genrsa -out LocalHostClient1.key 2048
openssl req -new -key LocalHostClient1.key -out LocalHostClient1.csr -config ca.cnf

openssl x509 -req -in LocalHostClient1.csr -CA LocalHostRootCA.pem -CAkey LocalHostRootCA.key -CAcreateserial -out LocalHostClient1.pem -days 1024 -sha256 -passin "pass:password"