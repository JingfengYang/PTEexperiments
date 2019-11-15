import copy
import torch
import pickle
import argparse
import numpy as np
from model import TextCNN
from loader import TextDataset
from sklearn.metrics import f1_score
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torch.utils.data.sampler import SubsetRandomSampler

if __name__=="__main__":
    parser = argparse.ArgumentParser(description='TextCNN input parameters')
    parser.add_argument('dataset', type=str, choices=['dblp','mr', '20ng'])
    parser.add_argument('--percent', type=str, default='')
    parser.add_argument('--without_unlabel', '-wu', action='store_true')
    parser.add_argument('--learning_rate', '-lr', type=float, default=0.0001)
    parser.add_argument('--save_dir', type=str, default='')
    parser.add_argument('--gpu', action='store_true')
    parser.add_argument('--verbose', action='store_true')
    args = parser.parse_args()

    # device = torch.device("cuda") if args.gpu else torch.device("cpu")
    dataset = TextDataset(args.dataset,args.percent, wo_unlabel=args.without_unlabel)
    print("Num of labeled data: ", len(dataset))
    emb = dataset.get_emb()
    num_class = dataset.num_class
    net = TextCNN(emb, num_class)
    best_model = TextCNN(emb, num_class)
    if args.gpu:
        net.cuda()
        best_model.cuda()
    indices = np.arange(len(dataset))
    np.random.shuffle(indices)
    split = round(0.1 * len(dataset))
    train_idx, valid_idx = indices[split:], indices[:split]
    train_sampler = SubsetRandomSampler(train_idx)
    valid_sampler = SubsetRandomSampler(valid_idx)
    dataLoader = DataLoader(dataset, batch_size=32,
                            num_workers=4, sampler=train_sampler)
    validLoader = DataLoader(dataset, batch_size=32,
                             num_workers=4, sampler=valid_sampler)
    loss_fn = nn.CrossEntropyLoss()
    softmax = nn.Softmax(dim=1)
    # Print per iteration
    len_print = 20

    if args.verbose:
        print("Training...")
    ep = 0
    init_loss = None
    no_improve_cnt = 0
    # Evaluate validation
    def validate(model):
        model.eval()
        cum_loss = 0.0
        cum_cnt = 0.0
        for it, data in enumerate(validLoader):
            inputs, labels = data
            if args.gpu:
                inputs = inputs.cuda()
                labels = labels.cuda()
            outputs = model(inputs)
            loss = loss_fn(outputs, labels).item()
            cum_loss += loss * labels.size(0)
            cum_cnt += labels.size(0)
        model.train()
        return cum_loss / cum_cnt
    while True:
        valid_loss = validate(net)
        if args.verbose:
            print('validation loss: %.5f' % (valid_loss))
        if ep == 0 or valid_loss < best_loss:
            best_loss = valid_loss
            best_model.load_state_dict(net.state_dict())
            no_improve_cnt = 0
        else:
            no_improve_cnt += 1
        if no_improve_cnt > 5 or ep > 1000:
            if args.verbose:
                print('final validation: %.5f' % (validate(best_model)))
                print('best validation: %.5f' % (best_loss))
            break
        # Train
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
        ep += 1
    if args.verbose:
        print("Testing...")
    net = best_model
    testset = TextDataset(args.dataset, args.percent, test=True, wo_unlabel=args.without_unlabel)
    testLoader = DataLoader(testset, batch_size=500,shuffle=False,num_workers=4)
    net.eval()
    net.cpu()
    f1_micro = 0.0
    f1_macro = 0.0
    cum_loss = 0.0
    ground_true = []
    pred = []
    for it, data in enumerate(testLoader):
        inputs, labels = data
        outputs = net(inputs)
        dist = softmax(outputs).detach().numpy()
        ground_true = np.concatenate([ground_true, labels.numpy()],axis=0)
        pred = np.concatenate([pred, np.argmax(dist,axis=1)],axis=0)
    f1_micro = f1_score(ground_true, pred, average='micro')
    f1_macro = f1_score(ground_true, pred, average='macro')
    print("F1 score: micro-%.5f\tmacro-%.5f" % (f1_micro, f1_macro))
