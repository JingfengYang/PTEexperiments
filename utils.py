##### Author: Jingfeng Yang #####
## Read word embeddings, sentences and sentence embeddings, build training and test dataset ##


import numpy as np

class Sent(object):
    def __init__(self,sent,label,ebd):
        self.label=label
        self.emb=ebd
        self.sent=sent


def read_word_embeds(file='dblp_workspace.5.without_unlabel/word.emb'):
    voc=[]
    with open(file,'r') as reader:
        print(file)
        i=0
        for line in reader:
            tokens=line.strip().split()
            if i==0:
                voc_size=int(tokens[0])
                ebd_dim=int(tokens[1])
                print(voc_size,ebd_dim)
                ebd = np.zeros((voc_size,ebd_dim), dtype=np.float64)
            else:
                voc.append(tokens[0])
                ebd[i-1]=np.array([float(v) for v in tokens[(-ebd_dim):]],dtype=np.float64)
            i+=1
        assert(i-1==voc_size)
    return voc, ebd

def readData(train_label_file='data/dblp/label_train.5.txt',train_text_file='data/dblp/text_train.txt',
             test_label_file='data/dblp/label_test.txt',test_text_file='data/dblp/text_test.txt',
             word_ebd_file='dblp_workspace.5.without_unlabel/word.emb',all_text_file='data/dblp/text_all.txt'):
    voc,word_ebd=read_word_embeds(file=word_ebd_file)
    dic={}

    for i,voc in enumerate(voc):
        dic[voc]=i
    allText=[]
    with open(all_text_file) as reader1:
        for line1 in reader1:
            sent=line1.strip().split()
            sent_ebd=[]
            for word in sent:
                if word in dic:
                    sent_ebd.append(word_ebd[dic[word]])

            if len(sent_ebd)==0:
                sent_ebd=[np.zeros_like(word_ebd[0],dtype=np.float64)]
            allText.append((sent,np.average(np.array(sent_ebd,dtype=np.float64),axis=0)))

    trainCorpus=[]

    with open(train_text_file) as reader1, open(train_label_file) as reader2:
        for line1,line2,text in zip(reader1,reader2,allText):
            assert(line1.strip().split()==text[0])
            sent=Sent(text[0],line2.strip(),text[1])
            trainCorpus.append(sent)

    totolTrainCount=0
    with open(train_text_file) as reader:
        for line in reader:
            totolTrainCount+=1

    testCorpus = []
    with open(test_text_file) as reader1, open(test_label_file) as reader2:
        for line1, line2, text in zip(reader1, reader2, allText[totolTrainCount:]):
            assert (line1.strip().split() == text[0])
            sent = Sent(text[0], line2.strip(), text[1])
            testCorpus.append(sent)


    return trainCorpus,testCorpus


if __name__ == "__main__":
    read_word_embeds()
    readData()
