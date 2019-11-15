import os
import numpy as np
import subprocess
percs = ['125','25','5',None]
dbs = ['dblp','mr', '20ng']
wu_flag = [True, False]
gpu = True

if __name__=="__main__":
    for db in dbs:
        for perc in percs:
            for wu in wu_flag:
                cmd = "python3 main.py %s" % (db)
                if perc is not None:
                    cmd += " --percent %s" % (perc)
                    if wu:
                        cmd += " -wu"
                elif wu:
                    continue
                if gpu:
                    cmd += " --gpu"
                print(cmd)
                process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stdin=subprocess.PIPE, shell=True)
                stdout, stderr = process.communicate()
                print(stdout.decode())
