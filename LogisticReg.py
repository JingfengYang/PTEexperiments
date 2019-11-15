
import matplotlib.pyplot as plt
import pickle


def LR(train_label_file, train_text_file, test_label_file, test_text_file, sent_ebd_file, all_text_file):
    # sent=utils.Sent()
    train_set, test_set = utils.readData(train_label_file, train_text_file, test_label_file, test_text_file,
                                         sent_ebd_file, all_text_file)
    print("len of train data: ", len(train_set))
    len_train = len(train_set)
    print("len of test data: ", len(test_set))
    len_test = len(test_set)
    # print("label of train data=",train_set[0].label)
    # print("embedding of train data=",train_set[0].emb)

    # Training dataset
    train_x = []
    train_y = []
    for i in range(0, len_train):
        x = train_set[i].emb
        train_x.append(x)
        y = train_set[i].label
        train_y.append(y)
    train_x = np.array(train_x)
    train_y = np.array(train_y)
    # Test dataset
    test_x = []
    test_y = []
    for i in range(0, len_test):
        x = test_set[i].emb
        test_x.append(x)
        y = test_set[i].label
        test_y.append(y)
    test_x = np.array(test_x)
    test_y = np.array(test_y)

    # Logistic Regression
    if (len(test_set) < 10000):
        logreg = LogisticRegression()
        logreg.fit(train_x, train_y)
        y_pred = logreg.predict(test_x)
    else:
        logreg = LogisticRegression(multi_class="multinomial", solver='newton-cg')
        logreg.fit(train_x, train_y)
        y_pred = logreg.predict(test_x)
    # with open('y_pred.pkl', 'wb') as f:
    #    pickle.dump(y_pred, f)
    # with open('test_y.pkl', 'wb') as f:
    #    pickle.dump(test_y, f)
    return y_pred, test_y


# for mr dataset
def Fscore(y_pred, test_y):
    # F-Measure
    C_sum_0 = 0  # obtaied cluster
    C_sum_1 = 0
    T_sum_0 = 0  # ground-truth cluster
    T_sum_1 = 0

    for i in range(y_pred.shape[0]):
        if (y_pred[i] == '0'):
            C_sum_0 += 1
        elif (y_pred[i] == '1'):
            C_sum_1 += 1
    print("C_sum_0=", C_sum_0)
    print("C_sum_1=", C_sum_1)

    for i in range(test_y.shape[0]):
        if (test_y[i] == '0'):
            T_sum_0 += 1
        if (test_y[i] == '1'):
            T_sum_1 += 1
    print("T_sum_0=", T_sum_0)
    print("T_sum_1=", T_sum_1)

    n00 = 0
    n01 = 0
    n10 = 0
    n11 = 0

    for i in range(y_pred.shape[0]):
        if (y_pred[i] == '0' and test_y[i] == '0'):
            n00 += 1
        if (y_pred[i] == '0' and test_y[i] == '1'):
            n01 += 1
        if (y_pred[i] == '1' and test_y[i] == '0'):
            n10 += 1
        if (y_pred[i] == '1' and test_y[i] == '1'):
            n11 += 1
    print("n00=", n00)
    print("n01=", n01)
    print("n10=", n10)
    print("n11=", n11)

    prec0 = max(n00, n01) / C_sum_0
    prec1 = max(n10, n11) / C_sum_1
    recall0 = max(n00, n01) / T_sum_0
    recall1 = max(n00, n01) / T_sum_1
    F0 = (2 * prec0 * recall0) / (prec0 + recall0)
    F1 = (2 * prec1 * recall1) / (prec1 + recall1)
    F = (F0 + F1) / 2

    print("_______________F Measure for label________________")
    print("Precision0=", prec0)
    print("Precision1=", prec1)
    print("Recall0=", recall0)
    print("Recall1=", recall1)
    print("F0=", F0)
    print("F1=", F1)
    print("F score=", F)
    return F


# FOR DBLP DATASET
def Fscore1(y_pred, test_y):
    # F-Measure
    C_sum_1 = 0  # obtaied cluster
    C_sum_2 = 0
    C_sum_3 = 0
    C_sum_4 = 0
    C_sum_5 = 0
    C_sum_6 = 0
    T_sum_1 = 0  # ground-truth cluster
    T_sum_2 = 0
    T_sum_3 = 0
    T_sum_4 = 0
    T_sum_5 = 0
    T_sum_6 = 0

    for i in range(y_pred.shape[0]):
        if (y_pred[i] == '1'):
            C_sum_1 += 1
        elif (y_pred[i] == '2'):
            C_sum_2 += 1
        elif (y_pred[i] == '3'):
            C_sum_3 += 1
        elif (y_pred[i] == '4'):
            C_sum_4 += 1
        elif (y_pred[i] == '5'):
            C_sum_5 += 1
        elif (y_pred[i] == '6'):
            C_sum_6 += 1
        y_pred[i] = np.int(y_pred[i])

    print("C_sum_1=", C_sum_1)
    print("C_sum_2=", C_sum_2)
    print("C_sum_3=", C_sum_3)
    print("C_sum_4=", C_sum_4)
    print("C_sum_5=", C_sum_5)
    print("C_sum_6=", C_sum_6)

    for i in range(test_y.shape[0]):
        if (test_y[i] == '1'):
            T_sum_1 += 1
        elif (test_y[i] == '2'):
            T_sum_2 += 1
        elif (test_y[i] == '3'):
            T_sum_3 += 1
        elif (test_y[i] == '4'):
            T_sum_4 += 1
        elif (test_y[i] == '5'):
            T_sum_5 += 1
        elif (test_y[i] == '6'):
            T_sum_6 += 1
        test_y[i] = np.int(test_y[i])
    print("T_sum_1=", T_sum_1)
    print("T_sum_2=", T_sum_2)

    n = np.zeros((6, 6))

    for i in range(y_pred.shape[0]):
        # print("the " ,i ,"data in ", y_pred.shape[0])
        row = np.int(y_pred[i]) - 1
        col = np.int(test_y[i]) - 1
        n[row][col] += 1
    with open('n.pkl', 'wb') as f:
        pickle.dump(n, f)

    # ith open('n.pkl', 'rb') as f:
    #    n = pickle.load(f)

    prec1 = np.max(n[0, :]) / C_sum_1
    prec2 = np.max(n[1, :]) / C_sum_2
    prec3 = np.max(n[2, :]) / C_sum_3
    prec4 = np.max(n[3, :]) / C_sum_4
    prec5 = np.max(n[4, :]) / C_sum_5
    prec6 = np.max(n[0, :]) / C_sum_6

    recall1 = np.max(n[0, :]) / T_sum_1
    recall2 = np.max(n[1, :]) / T_sum_2
    recall3 = np.max(n[2, :]) / T_sum_3
    recall4 = np.max(n[3, :]) / T_sum_4
    recall5 = np.max(n[4, :]) / T_sum_5
    recall6 = np.max(n[0, :]) / T_sum_6

    F1 = (2 * prec1 * recall1) / (prec1 + recall1)
    F2 = (2 * prec2 * recall2) / (prec2 + recall2)
    F3 = (2 * prec3 * recall3) / (prec3 + recall3)
    F4 = (2 * prec4 * recall4) / (prec4 + recall4)
    F5 = (2 * prec5 * recall5) / (prec5 + recall5)
    F6 = (2 * prec6 * recall6) / (prec6 + recall6)
    F = (F1 + F2 + F3 + F4 + F5 + F6) / 6

    print("_______________F Measure for label________________")
    print("F score=", F)
    return F


if __name__ == "__main__":
    # This is the logistic regression of mr data set

    F = []
    y_pred_all, y_test_all = LR(train_label_file='data/mr/label_train.txt', train_text_file='data/mr/text_train.txt',
                                test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                                sent_ebd_file='mr_workspace/text.emb', all_text_file='data/mr/text_all.txt')
    F.append(Fscore(y_pred_all, y_test_all))
    y_pred_50, y_test_50 = LR(train_label_file='data/mr/label_train.5.txt', train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              sent_ebd_file='mr_workspace.5/text.emb', all_text_file='data/mr/text_all.txt')
    F.append(Fscore(y_pred_50, y_test_50))
    y_pred_25, y_test_25 = LR(train_label_file='data/mr/label_train.25.txt', train_text_file='data/mr/text_train.txt',
                              test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                              sent_ebd_file='mr_workspace.25/text.emb', all_text_file='data/mr/text_all.txt')
    F.append(Fscore(y_pred_25, y_test_25))
    y_pred_125, y_test_125 = LR(train_label_file='data/mr/label_train.125.txt',
                                train_text_file='data/mr/text_train.txt',
                                test_label_file='data/mr/label_test.txt', test_text_file='data/mr/text_test.txt',
                                sent_ebd_file='mr_workspace.125/text.emb', all_text_file='data/mr/text_all.txt')
    F.append(Fscore(y_pred_125, y_test_125))
    F = np.array(F)
    plt.figure()
    F = F[::-1]
    plt.title("mr dataset")
    x = np.array([0.125, 0.25, 0.5, 1])
    plt.plot(x, F)
    plt.show()

    # This is the logistic regression of dblp dataset. The F score is really low.
    '''
    F1 = []
    print("___________DBLP_______________")

    y_pred_all, y_test_all = LR(train_label_file='data/dblp/label_train.txt',
                                train_text_file='data/dblp/text_train.txt',
                                test_label_file='data/dblp/label_test.txt', test_text_file='data/dblp/text_test.txt'
                                , sent_ebd_file='dblp_workspace/text.emb', all_text_file='data/dblp/text_all.txt')
    F1.append(Fscore1(y_pred_all, y_test_all))

    y_pred_50, y_test_50 = LR(train_label_file = 'data/dblp/label_train.5.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,sent_ebd_file = 'dblp_workspace.5/text.emb',all_text_file = 'data/dblp/text_all.txt')
    with open('y_pred.pkl', 'rb') as f:
        y_pred_50 = pickle.load(f)
    #with open('test_y.pkl', 'rb') as f:
    #    y_test_50 = pickle.load(f)
    F1.append(Fscore1(y_pred_50, y_test_50))



    y_pred_25, y_test_25 = LR(train_label_file = 'data/dblp/label_train.25.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,sent_ebd_file = 'dblp_workspace.25/text.emb',all_text_file = 'data/dblp/text_all.txt')
    F1.append(Fscore1(y_pred_25, y_test_25))

    y_pred_125, y_test_125 = LR(train_label_file = 'data/dblp/label_train.125.txt',train_text_file = 'data/dblp/text_train.txt',
                                test_label_file = 'data/dblp/label_test.txt',test_text_file = 'data/dblp/text_test.txt'
                                ,sent_ebd_file = 'dblp_workspace.125/text.emb',all_text_file = 'data/dblp/text_all.txt')
    F1.append(Fscore1(y_pred_125, y_test_125))

    F1 = np.array(F1)
    plt.figure()
    F1 = F1[::-1]
    plt.title("dblp dataset")
    x = np.array([0.125, 0.25, 0.5, 1])
    plt.plot(x, F1)
    plt.show()
    '''








