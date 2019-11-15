fp = open('lw.net', 'r')

line = fp.readline()
print("links = [")
all_words = ["data", "world", "entropy", "card", "lists", "topic", "recycling", "external", "mappings", "routes", "subnetworks", "utilizing", "texts", "surface", "urban", "handwriting", "faciltity", "specifying", "developing", "sketching", "unaggregated", "subpopulation", "closure", "subsequence", "searching", "warping", "quantitative", "restricted", "light", "dsp", "special", "express", "ontological", "lines", "controllers", "bursty", "sample", "manifold", "perspective", "during", "tracking", "continuous", "learning", "interactive", "system", "programming", "language", "for", "modular", "router", "efficient", "algorithms", "business", "entropy", "word", "sense", "action", "imperfect", "international", "exploration", "indexing", "golog", "corba", "uniform", "estimating", "no", "one", "small", "lower", "car", "complicated", "java", "risk", "sublinear", "study", "controlling", "weighted", "interaction", "file", "results", "points", "other", "disambiguation", "robot", "event", "networking", "query", "wide", "streaming", "three", "science", "road", "reuse", "universal", "link", "reconstruction", "condition", "temporal", "aspects", "association", "querying", "robotic", "examples", "self", "rings", "vision", "spoken", "concurrency", "where", "training", "analysis", "problems", "optimal", "hull", "simple", "log"]
while line:
    splitted = line.split(' ')
    if splitted[1] in all_words:
        print("  { \"" + splitted[0][:5] + '": ' + splitted[0][6] + ', "target": "' + splitted[1] + '" },')
        all_words.remove(splitted[1])
    line = fp.readline()

print("];")

fp.close()