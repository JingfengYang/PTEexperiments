CC = g++
CFLAGS = -static -lm -pthread -Ofast -march=native -Wall -funroll-loops -Wno-unused-result -lgsl -lm -lgslcblas
LFLAGS = -lgsl -lm -lgslcblas
INCLUDES = -I/usr/local/include -I../eigen-eigen-323c052e1731
LIBS = -L/usr/local/lib


pte : linelib.o main.o
	$(CC) $(CFLAGS) -o pte linelib.o main.o $(INCLUDES) $(LIBS) $(LFLAGS)

linelib.o : linelib.cpp
	$(CC) $(CFLAGS) -c linelib.cpp $(INCLUDES) $(LIBS) $(LFLAGS)

main.o : main.cpp linelib.o
	$(CC) $(CFLAGS) -c main.cpp $(INCLUDES) $(LIBS) $(LFLAGS)

clean :
	rm -rf *.o pte
