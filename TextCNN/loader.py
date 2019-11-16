import os
import re
import random
import numpy as np
import pickle
import sys
import torch
from utils import read_word_embeds
from torch.utils.data import Dataset, DataLoader

class TextDataset(Dataset):
    def __init__(self, dataset, prc='', test=False, wo_unlabel=False):
        _extend = '.without_unlabel' if wo_unlabel else ''
        if len(prc) > 0:
            prc = '.' + prc
        else:
            assert(not wo_unlabel)
        # Train files
        train_label_file = 'data/%s/label_train%s.txt' % (dataset, prc)
        train_label_file = os.path.join('..', train_label_file)
        train_text_file = 'data/%s/text_train.txt' % (dataset)
        train_text_file = os.path.join('..', train_text_file)
        # Test files
        test_label_file = 'data/%s/label_test.txt' % (dataset)
        test_label_file = os.path.join('..', test_label_file)
        test_text_file = 'data/%s/text_test.txt' % (dataset)
        test_text_file = os.path.join('..', test_text_file)
        # Word embedings
        emb_file = '%s_workspace%s/word.emb' % (dataset, prc+_extend)
        emb_file = os.path.join('..', emb_file)

        # Unused directories
        sent_ebd_file = '%s_workspace%s/text.emb' % (dataset, prc)
        sent_ebd_file = os.path.join('..', sent_ebd_file)
        all_text_file = 'data/%s/text_all.txt' % (dataset)
        all_text_file = os.path.join('..', all_text_file)

        self.voc, self.emb = read_word_embeds(emb_file)
        _temp = np.zeros((1,self.emb.shape[1]),dtype=self.emb.dtype)
        # Add two more embeddings at the front and tail of
        # word embedding for padding and UNK respectively.
        self.emb = np.concatenate((_temp, self.emb, _temp.copy()))
        self.dicts = {self.voc[i]:i+1 for i in range(len(self.voc))}
        self.text_data = []
        self.label_data = []
        self.num_class = 1
        # Switch between train dataset and test dataset
        text_file = test_text_file if test else train_text_file
        label_file = test_label_file if test else train_label_file
        with open(text_file,'r',encoding='utf-8') as reader1, open(label_file) as reader2:
            for line1, line2 in zip(reader1, reader2):
                words = line1.strip().split()
                _data = [self.dicts.get(word) for word in words]
                line_data = [self.emb.shape[0]-1 if v is None else v for v in _data]
                self.text_data.append(np.array(line_data,dtype=np.int64))
                self.label_data.append(int(line2.strip()))
        self.label_data = np.array(self.label_data, dtype=np.int64)
        # Make labels start from 0
        if np.min(self.label_data) != 0:
            self.label_data -= np.min(self.label_data)
        self.num_class = np.max(self.label_data)+1
        text_len = map(lambda x:len(x), self.text_data)
        sent_len = min(max(text_len), 300)
        for v in self.text_data:
            v.resize(sent_len, refcheck=False)
        self.text_data = np.array(self.text_data)

    def __len__(self):
        return len(self.text_data)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()
        return self.text_data[idx], self.label_data[idx]

    def get_dict(self):
        return self.dicts

    def get_emb(self):
        return self.emb
