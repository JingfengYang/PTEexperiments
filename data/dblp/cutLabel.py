labels=[]
with open('label_train.txt') as reader:
    for line in reader:
        labels.append(line.strip())
with open('label_train.5.txt', 'w') as writer:
    curLabels=labels[:len(labels)//2]
    for l in curLabels[:-1]:
        writer.write(l+'\n')
    writer.write(curLabels[-1])
with open('label_train.25.txt', 'w') as writer:
    curLabels=labels[:len(labels)//4]
    for l in curLabels[:-1]:
        writer.write(l+'\n')
    writer.write(curLabels[-1])
with open('label_train.125.txt', 'w') as writer:
    curLabels=labels[:len(labels)//8]
    for l in curLabels[:-1]:
        writer.write(l+'\n')
    writer.write(curLabels[-1])