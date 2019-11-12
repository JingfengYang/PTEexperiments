import os
import numpy as np
import subprocess
percs = [None, '5', '25', '125']
dbs = ['dblp','mr']
gpu = False

if __name__=="__main__":
    for db in dbs:
        for perc in percs:
            cmd = "python3 main.py %s" % (db)
            if perc is not None:
                cmd += " --percent %s" % (perc)
            if gpu:
                cmd += " --gpu"
            print(cmd)
            process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, shell=True)
            stdout, stderr = process.communicate()
            print(stdout.decode())
