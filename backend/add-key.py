import psycopg
import sys

print(sys.argv)
id = sys.argv[1]
X = sys.argv[2]
Y = sys.argv[3]
n0 = sys.argv[4]
sum = sys.argv[5]

conn = psycopg.connect(dbname="mypocket", user="postgres", password="", host="localhost", port="5432")
conn.autocommit = True
cur = conn.cursor()

cur.execute("insert into encryption_keys VALUES(%s,%s,%s,%s,%s) ",(id,X,Y,n0,sum))