import psycopg
import sys


rid = sys.argv[1]
name = sys.argv[2]

conn = psycopg.connect(dbname="mypocket", user="postgres", password="2002", host="localhost", port="5432")
conn.autocommit = True
cur = conn.cursor()
cur.execute("delete from decrypting where id=%s",(rid,))
cur.execute("insert into decrypting(id,name,done) VALUES(%s,%s,true) ",(rid,name))
