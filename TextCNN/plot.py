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
    dblp_ma = []
    dblp_mi = []
    dblp_x = []
    mr_ma = []
    mr_mi = []
    mr_x = []
    while True:
        line = f.readline()
        if (len(line) == 0):
            break
        if "mr" in line:
            temp = re.match(pattern1, line)
            if temp is not None:
                mr_x.append(float('0.'+temp.group(1)))
            else:
                mr_x.append(1.0)
            _ = f.readline() # Num of labels
            n_line = f.readline()
            temp = re.match(pattern2, n_line)
            mr_mi.append(float(temp.group(1)))
            mr_ma.append(float(temp.group(2)))
        elif "dblp" in line:
            temp = re.match(pattern1, line)
            if temp is not None:
                dblp_x.append(float('0.'+temp.group(1)))
            else:
                dblp_x.append(1.0)
            _ = f.readline() # Num of labels
            n_line = f.readline()
            temp = re.match(pattern2, n_line)
            dblp_mi.append(float(temp.group(1)))
            dblp_ma.append(float(temp.group(2)))
        else:
            if len(line) > 1:
                print(line)
            pass

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


