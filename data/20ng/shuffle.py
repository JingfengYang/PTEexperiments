import random
labels=[]
with open('label_train_ordered.txt', 'r',encoding='ISO-8859-1') as reader:
    for line in reader:
        labels.append(line.strip())

textTrain=[]
textAll=[]
with open('text_train_ordered.txt', 'r',encoding='ISO-8859-1') as reader:
    for line in reader:
        textTrain.append(line.strip())

with open('text_all_ordered.txt', 'r',encoding='ISO-8859-1') as reader:
    for line in reader:
        textAll.append(line.strip())
assert(len(labels)==len(textTrain))

ts=[]

for l,t,a in zip(labels,textTrain,textAll[:len(textTrain)]):
    assert(t==a)
    ts.append((l,t,a))

random.shuffle(ts)

with open('label_train.txt','w') as writerl, open('text_train.txt','w') as writert, open('text_all.txt','w') as writera:
    for l,t,a in ts:
        writerl.write(l+'\n')
        writert.write(t+'\n')
        writera.write(a+'\n')

    for a in textAll[len(textTrain):]:
        writera.write(a + '\n')

with open('label_test_ordered.txt', 'r',encoding='ISO-8859-1') as reader, open('label_test.txt','w') as writer:
    for line in reader:
        writer.write(line)

with open('text_test_ordered.txt', 'r',encoding='ISO-8859-1') as reader, open('text_test.txt','w') as writer:
    for line in reader:
        writer.write(line)

