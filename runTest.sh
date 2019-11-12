#!/bin/sh

infer_file=data/mr/text_all.txt # the text file to infer
output_path=mr_workspace/

window=5 # the window size for the construction of the word-word network
min_count=0 # discard words that appear less than <min_count>

# infer the embeddings of the texts provided in the <infer_file>
./text2vec/infer -infer ${infer_file} -vector ${output_path}word.emb -output ${output_path}text.emb -debug 2 -binary 0
