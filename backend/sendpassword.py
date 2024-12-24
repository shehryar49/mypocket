import smtplib, ssl
import sys


receiver_email = sys.argv[1]
otp = sys.argv[2]

port = 587 #465  # For SSL
password = "wujf fyud poqt arsi "

# Create a secure SSL context
context = ssl.create_default_context()

server = smtplib.SMTP("smtp.gmail.com", port)
server.ehlo()
server.starttls()
server.ehlo()
server.login("mypocketotp@gmail.com", password)
# Send email here
sender_email = "mypocketotp@gmail.com"
message = f"""\
Subject: My Pocket Password Reset

Your new password is {otp}. Use this to login and CHANGE THE PASSWORD!"""
server.sendmail(sender_email, receiver_email, message)
