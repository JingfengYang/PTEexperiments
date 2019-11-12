import utils
import numpy as np
from sklearn.linear_model import LogisticRegression


#sent=utils.Sent()
train_set,test_set=utils.readData()
print("len of train data: ",len(train_set))
len_train=len(train_set)
print("len of test data: ",len(test_set))
len_test=len(test_set)
#print("label of train data=",train_set[0].label)
#print("embedding of train data=",train_set[0].emb)

#Training dataset
train_x=[]
train_y=[]
for i in range(0,len_train):
    x=train_set[i].emb
    train_x.append(x)
    y=train_set[i].label
    train_y.append(y)
train_x=np.array(train_x)
train_y=np.array(train_y)
#Test dataset
test_x=[]
test_y=[]
for i in range(0,len_test):
    x=test_set[i].emb
    test_x.append(x)
    y=test_set[i].label
    test_y.append(y)
test_x=np.array(test_x)
test_y=np.array(test_y)

#Logistic Regression
logreg=LogisticRegression()
logreg.fit(train_x,train_y)
y_pred=logreg.predict(test_x)

print('#######',y_pred)
#F-Measure
C_sum_0=0  #obtaied cluster
C_sum_1=0
T_sum_0=0  #ground-truth cluster
T_sum_1=0

for i in range (y_pred.shape[0]):
    if(y_pred[i]=='0'):
        C_sum_0+=1
    elif(y_pred[i]=='1'):
        C_sum_1+=1
print("C_sum_0=",C_sum_0)
print("C_sum_1=",C_sum_1)

for i in range(test_y.shape[0]):
    if(test_y[i]=='0'):
        T_sum_0+=1
    if(test_y[i]=='1'):
        T_sum_1+=1
print("T_sum_0=",T_sum_0)
print("T_sum_1=",T_sum_1)

n00=0
n01=0
n10=0
n11=0

for i in range(y_pred.shape[0]):
    if (y_pred[i]=='0' and test_y[i]=='0'):
        n00+=1
    if (y_pred[i] == '0' and test_y[i] == '1'):
        n01 += 1
    if (y_pred[i] == '1' and test_y[i] == '0'):
        n10 += 1
    if (y_pred[i] == '1' and test_y[i] == '1'):
        n11 += 1
print("n00=",n00)
print("n01=",n01)
print("n10=",n10)
print("n11=",n11)

prec0=n00/C_sum_0
prec1=n11/C_sum_1
recall0=n00/T_sum_0
recall1=n11/T_sum_1
F0=(2*prec0*recall0)/(prec0+recall0)
F1=(2*prec1*recall1)/(prec1+recall1)
F=(F0+F1)/2

print("_______________F Measure for 100% label________________")
print("Precision0=",prec0)
print("Precision1=",prec1)
print("Recall0=",recall0)
print("Recall1=",recall1)
print("F0=",F0)
print("F1=",F1)
print("F score=",F)








