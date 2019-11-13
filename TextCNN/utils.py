##### Author: Jingfeng Yang #####
## Read word embeddings, sentences and sentence embeddings, build training and test dataset ##

import numpy as np

def read_word_embeds(file='mr_workspace/word.emb'):
    voc=[]
    with open(file,'r',encoding='utf-8') as reader:
        i=0
        for line in reader:
            tokens=line.strip().split()
            if i==0:
                voc_size=int(tokens[0])
                ebd_dim=int(tokens[1])
                ebd = np.zeros((voc_size,ebd_dim), dtype=np.float64)
            else:
                voc.append(tokens[0])
                ebd[i-1]=np.array([float(v) for v in tokens[(-ebd_dim):]],dtype=np.float64)
            i+=1
        assert(i-1==voc_size)
    return voc, ebd
