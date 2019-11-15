import torch
import torch.nn as nn
import torch.nn.functional as Fn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np

class TextCNN(nn.Module):
    def __init__(self, emb, nC):
        super(TextCNN, self).__init__()
        kernels = [3,4,5]
        dim = emb.shape[-1]
        dp = 0.5
        ch_in = 1
        ch_out = 64
        hidden_dim = 64
        self.conv1s = nn.ModuleList([nn.Conv2d(ch_in, ch_out, (kernel, dim)) for kernel in kernels])
        self.emb = nn.Embedding.from_pretrained(torch.Tensor(emb))
        self.emb.weight.requires_grad = False
        self.dropout = nn.Dropout(dp)
        self.fc1 = nn.Linear(len(kernels)*ch_out, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, nC)

    def forward(self, input):
        input = self.emb(input)
        # Expand dimension for input channel
        input = input.unsqueeze(1)
        outs = [Fn.relu(conv1(input)).squeeze(3) for conv1 in self.conv1s]
        outs = [Fn.max_pool1d(out, out.size(2)).squeeze(2) for out in outs]
        # Concatenate all predictions
        outs = torch.cat(outs, 1)
        outs = self.dropout(outs)
        outs = Fn.relu(self.fc1(outs))
        outs = self.dropout(outs)
        logits = self.fc2(outs)
        return logits
