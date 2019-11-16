import os
import re
import numpy as np
import matplotlib.pyplot as plt

if __name__=="__main__":
    try:
        f = open('result.txt', 'r')
    except:
        print('No result.txt')
        exit(0)
    pattern1 = r".*--percent ([0-9]+)"
    pattern2 = r".*micro-(0\.[0-9]*).*macro-(0\.[0-9]*)"
    pattern3 = r".*-wu"
    res = {}
    dataset = ['mr','dblp','20ng']
    Fmicrotype = 1
    Fmacrotype = 2
    while True:
        line = f.readline()
        if (len(line) == 0):
            break
        for name in dataset:
            if name in line:
                temp = re.match(pattern1, line)
                wu = re.match(pattern3, line)
                wu = wu is not None
                _x = 0.0
                if temp is not None:
                    _x = float('0.'+temp.group(1))
                else:
                    _x = 1.0
                _ = f.readline() # Num of labels
                n_line = f.readline()
                fscore = re.match(pattern2, n_line)
                tuple = (name, wu, Fmicrotype)
                if res.get(tuple) is None:
                    res[tuple] = []
                res[tuple].append([_x, float(fscore.group(Fmicrotype))])
                if temp is None:
                    res[(name, not wu, Fmicrotype)].append([_x, float(fscore.group(Fmicrotype))])
                tuple = (name, wu, Fmacrotype)
                if res.get(tuple) is None:
                    res[tuple] = []
                res[tuple].append([_x, float(fscore.group(Fmacrotype))])
                if temp is None:
                    res[(name, not wu, Fmacrotype)].append([_x, float(fscore.group(Fmacrotype))])
    if not os.path.exists('output'):
        os.makedirs('output')
    for key,value in res.items():
        wu = 'non-ww' if key[1] else 'ww'
        fstype = 'Fmicro' if key[2]==Fmicrotype else 'Fmacro'
        np.savetxt('output/CNN_embed-vis-%s-%s-%s.csv'%(key[0], wu, fstype),
                   np.array(value), delimiter=',', fmt='%10.5f')

"""
    p = np.argsort(np.array(mr_x))
    mr_x = np.array(mr_x)[p]
    mr_mi = np.array(mr_mi)[p]
    mr_ma = np.array(mr_ma)[p]
    print(mr_mi)
    print(mr_ma)
    plt.plot(mr_x,mr_mi,label='micro')
    plt.plot(mr_x,mr_ma,label='macro')
    plt.title('mr dataset')
    plt.legend()
    plt.savefig('MR.png')
    plt.clf()
    p = np.argsort(np.array(dblp_x))
    dblp_x = np.array(dblp_x)[p]
    dblp_mi = np.array(dblp_mi)[p]
    dblp_ma = np.array(dblp_ma)[p]
    print(dblp_mi)
    print(dblp_ma)
    plt.plot(dblp_x,dblp_mi,label='micro')
    plt.plot(dblp_x,dblp_ma,label='macro')
    plt.title('dblp dataset')
    plt.legend()
    plt.savefig('dblp.png')
"""


