import torch
import pickle
import argparse
import numpy as np
from model import TextCNN
from loader import TextDataset
from sklearn.metrics import f1_score
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

if __name__=="__main__":
    parser = argparse.ArgumentParser(description='TextCNN input parameters')
    parser.add_argument('dataset', type=str, choices=['dblp','mr'])
    parser.add_argument('--percent', type=str, default='')
    parser.add_argument('--learning_rate', '-lr', type=float, default=0.0001)
    parser.add_argument('--save_dir', type=str, default='')
    parser.add_argument('--gpu', action='store_true')
    parser.add_argument('--verbose', action='store_true')
    args = parser.parse_args()

    # device = torch.device("cuda") if args.gpu else torch.device("cpu")
    dataset = TextDataset(args.dataset,args.percent)
    print("Num of labeled data: ", len(dataset))
    emb = dataset.get_emb()
    num_class = dataset.num_class
    net = TextCNN(emb, num_class)
    if args.gpu:
        net.cuda()
    dataLoader = DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)
    loss_fn = nn.CrossEntropyLoss()
    softmax = nn.Softmax(dim=1)
    # Print per iteration
    len_print = 20

    if args.verbose:
        print("Training...")
    for ep in range(8):
        for it, data in enumerate(dataLoader, start=0):
            inputs, labels = data
            if args.gpu:
                inputs = inputs.cuda()
                labels = labels.cuda()
            optimizer = torch.optim.Adam(net.parameters(), lr=args.learning_rate)
            optimizer.zero_grad()
            outputs = net(inputs)
            # Notice that labels here are preprocessed by
            # TextDataset and all labels start from 0
            _loss = loss_fn(outputs, labels)
            _loss.backward()
            loss = _loss.item()
            optimizer.step()
            if it % len_print == 0 and it > 0 and args.verbose:
                if args.gpu:
                    outputs = outputs.cpu()
                    labels = labels.cpu()
                ground_true = labels.numpy()
                dist = softmax(outputs).detach().numpy()
                acc = (np.argmax(dist,axis=1) == ground_true).sum()/dist.shape[0]
                print('[%d,%5d] loss: %.3f acc: %.3f' % (ep, it, loss, acc))
    if args.verbose:
        print("Testing...")
    testset = TextDataset(args.dataset, args.percent, test=True)
    testLoader = DataLoader(testset, batch_size=len(testset),shuffle=False,num_workers=4)
    net.eval()
    net.cpu()
    f1_micro = 0.0
    f1_macro = 0.0
    for it, data in enumerate(testLoader):
        inputs, labels = data
        outputs = net(inputs)
        dist = softmax(outputs).detach().numpy()
        ground_true = labels.numpy()
        pred = np.argmax(dist,axis=1)
        acc = (pred == ground_true).sum()/dist.shape[0]
        f1_micro = f1_score(ground_true, pred, average='micro')
        f1_macro = f1_score(ground_true, pred, average='macro')
    # print("Final accuracy: %.5f" % acc)
    print("F1 score: micro-%.5f\tmacro-%.5f" % (f1_micro, f1_macro))
