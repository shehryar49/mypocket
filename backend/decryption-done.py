import psycopg
import sys


rid = sys.argv[1]
name = sys.argv[2]

conn = psycopg.connect(dbname="mypocket", user="postgres", password="", host="localhost", port="5432")
conn.autocommit = True
cur = conn.cursor()

cur.execute("insert into decrypting(id,name,done) VALUES(%s,%s,true) ",(rid,name))