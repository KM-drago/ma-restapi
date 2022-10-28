ECHO OFF
ECHO Starting Services
CD .
START nx serve auth
START nx serve buyer
START nx serve delivery
START nx serve mail-sms
START nx serve payment
START nx serve seller
PAUSE
