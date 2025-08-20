CREATE DATABASE userservice;      GRANT ALL ON userservice.*       TO 'app'@'%';
CREATE DATABASE emailservice;     GRANT ALL ON emailservice.*      TO 'app'@'%';
CREATE DATABASE productservice;   GRANT ALL ON productservice.*    TO 'app'@'%';
CREATE DATABASE orderservice;     GRANT ALL ON orderservice.*      TO 'app'@'%';
CREATE DATABASE paymentservice;   GRANT ALL ON paymentservice.*    TO 'app'@'%';
CREATE DATABASE recommendservice; GRANT ALL ON recommendservice.*  TO 'app'@'%';
CREATE DATABASE sellerservice;    GRANT ALL ON sellerservice.*     TO 'app'@'%';
CREATE DATABASE adminservice;     GRANT ALL ON adminservice.*      TO 'app'@'%';
FLUSH PRIVILEGES;
