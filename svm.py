# read the dataset and conduct the svm processing

import utils
import numpy as np

import sklearn

from sklearn.metrics import precision_recall_fscore_support
from sklearn.metrics import accuracy_score
#
def two_class_metric(yTest,yPredict):
    # print(yTest, yPredict)
    precision,recall,f1Macro,_=precision_recall_fscore_support(yTest, yPredict,average='binary', pos_label="1")
    precision,recall,f1Micro,_=precision_recall_fscore_support(yTest, yPredict,average='binary', pos_label="1")
    precision,recall,f1Weighted,_=precision_recall_fscore_support(yTest, yPredict,average='binary', pos_label="1")
    accScore=accuracy_score(yTest, yPredict)
    allList=[precision,recall,f1Macro,f1Micro,f1Weighted,accScore]
    return precision,recall,f1Macro,f1Micro,f1Weighted,accScore,allList

def multi_class_metric(yTest,yPredict):
    precision,recall,f1Macro,_=precision_recall_fscore_support(yTest, yPredict, average="macro")
    precision,recall,f1Micro,_=precision_recall_fscore_support(yTest, yPredict, average="micro")
    precision,recall,f1Weighted,_=precision_recall_fscore_support(yTest, yPredict, average="weighted")
    accScore=accuracy_score(yTest, yPredict)
    allList=[precision,recall,f1Macro,f1Micro,f1Weighted,accScore]
    return precision,recall,f1Macro,f1Micro,f1Weighted,accScore,allList

def train_list_update(sent_obj, x, y):
    x.append(sent_obj.emb)
    y.append(sent_obj.label)

def corpus_read(corpus):
    x = []
    y = []
    for i in range(len(corpus)):
        sent_obj = corpus[i]
        train_list_update(sent_obj, x, y)
    x = np.array(x)
    y = np.array(y)
    return x, y

def train_test_data_read(train_label_file, train_text_file, test_label_file, test_text_file, word_ebd_file, all_text_file):
    trainCorpus, testCorpus = utils.readData(train_label_file, train_text_file, test_label_file, test_text_file,
                                         word_ebd_file, all_text_file)
    train_x, train_y = corpus_read(trainCorpus)

    test_x, test_y = corpus_read(testCorpus)

    return train_x,  train_y, test_x, test_y

def svm(train_x,  train_y, test_x):
    import sklearn.svm as svm
    clf = svm.SVC()
    clf.fit(train_x, train_y)
    pred = clf.predict(test_x)
    return pred

def metric_setting(test_y, pred):
    if len(np.unique(test_y)) >2:
        precision,recall,f1Macro,f1Micro,f1Weighted,accScore,allList = multi_class_metric(test_y, pred)
    else:
        precision, recall, f1Macro, f1Micro, f1Weighted, accScore, allList = two_class_metric(test_y, pred)
    return precision, recall, f1Macro, f1Micro, f1Weighted, accScore, allList

def SVM(train_label_file, train_text_file, test_label_file, test_text_file, word_ebd_file, all_text_file):
    train_x, train_y, test_x, test_y = train_test_data_read(train_label_file, train_text_file, test_label_file,
                                                            test_text_file, word_ebd_file, all_text_file)
    pred = svm(train_x, train_y, test_x)
    precision,recall,f1Macro,f1Micro,f1Weighted,accScore,_  =metric_setting(test_y, pred)
    return precision,recall,f1Macro,f1Micro,f1Weighted,accScore

if __name__ == "__main__":


    #### dblp dataset

    F1_Micro_list_dblp = []
    F1_Macro_list_dblp = []

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.125.txt',
                                                               train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.125/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.125.txt',
                                                               train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.125.without_unlabel/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.25.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.25/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.25.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.25.without_unlabel/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.5.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.5/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file = 'data/dblp/label_train.5.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,word_ebd_file = 'dblp_workspace.5.without_unlabel/word.emb',all_text_file = 'data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/dblp/label_train.txt',
                                train_text_file='data/dblp/text_train.txt',
                                test_label_file='data/dblp/label_test.txt', test_text_file='data/dblp/text_test.txt'
                                , word_ebd_file='dblp_workspace/word.emb', all_text_file='data/dblp/text_all.txt')
    F1_Micro_list_dblp.append(f1Micro)
    F1_Macro_list_dblp.append(f1Macro)

    print("the dblp reulst is ", F1_Micro_list_dblp, F1_Macro_list_dblp)

    ### MR dataset
    F1_Micro_list_mr = []
    F1_Macro_list_mr = []


    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.125.txt',
                                                               train_text_file='data/mr/text_train.txt',
                                test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                                word_ebd_file='mr_workspace.125/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.125.txt',
                                                               train_text_file='data/mr/text_train.txt',
                                test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                                word_ebd_file='mr_workspace.125.without_unlabel/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)


    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.25.txt',
                                                               train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              word_ebd_file='mr_workspace.25/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.25.txt',
                                                               train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              word_ebd_file='mr_workspace.25.without_unlabel/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.5.txt',
                                                               train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              word_ebd_file='mr_workspace.5/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.5.txt',
                                                               train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              word_ebd_file='mr_workspace.5.without_unlabel/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/mr/label_train.txt',
                                                               train_text_file='data/mr/text_train.txt',
                                test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                                word_ebd_file='mr_workspace/word.emb', all_text_file='data/mr/text_all.txt')
    F1_Micro_list_mr.append(f1Micro)
    F1_Macro_list_mr.append(f1Macro)

    print('the mr result is', F1_Micro_list_mr, F1_Macro_list_mr)

    ## 20 NG dataset
    F1_Micro_list_ng = []
    F1_Macro_list_ng = []


    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.125.txt',
                              train_text_file='data/20ng/text_train.txt',
                              test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                              word_ebd_file='20ng_workspace.125/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.125.txt',
                              train_text_file='data/20ng/text_train.txt',
                              test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                              word_ebd_file='20ng_workspace.125.without_unlabel/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)   #



    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.25.txt',
                                train_text_file='data/20ng/text_train.txt',
                                test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                                word_ebd_file='20ng_workspace.25/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.25.txt',
                                train_text_file='data/20ng/text_train.txt',
                                test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                                word_ebd_file='20ng_workspace.25.without_unlabel/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.5.txt',
                                train_text_file='data/20ng/text_train.txt',
                                test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                                word_ebd_file='20ng_workspace.5/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.5.txt',
                                train_text_file='data/20ng/text_train.txt',
                                test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                                word_ebd_file='20ng_workspace.5.without_unlabel/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    precision,recall,f1Macro,f1Micro,f1Weighted,accScore = SVM(train_label_file='data/20ng/label_train.txt', train_text_file='data/20ng/text_train.txt',
                                test_label_file='data/20ng/label_test.txt', test_text_file='data/20ng/text_test.txt',
                                word_ebd_file='20ng_workspace/word.emb', all_text_file='data/20ng/text_all.txt')
    F1_Micro_list_ng.append(f1Micro)
    F1_Macro_list_ng.append(f1Macro)

    print('the ng result is', F1_Micro_list_ng, F1_Macro_list_ng)











