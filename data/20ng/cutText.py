labels=[]
with open('text_train.txt') as reader:
    for line in reader:
        labels.append(line.strip())
with open('text_train.5.txt', 'w') as writer:
    curLabels=labels[:len(labels)//2]
    for l in curLabels:
        writer.write(l+'\n')
with open('text_train.25.txt', 'w') as writer:
    curLabels=labels[:len(labels)//4]
    for l in curLabels:
        writer.write(l+'\n')
with open('text_train.125.txt', 'w') as writer:
    curLabels=labels[:len(labels)//8]
    for l in curLabels:
        writer.write(l+'\n')
