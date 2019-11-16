fp = open('lw.net', 'r')

line = fp.readline()
print("links = [")
all_words = ["terms", "college", "borderline", "harvard", "laugh-out-loud", "insulting", "loopy", "carl", "moat", "ludicrous", "issue", "protracted", "borderline", "brutal", "stirring", "extended", "bedroom", "pre-credit", "judith", "zaza's", "executed", "fluid", "dramaturgy", "surge", "swirling", "sequence", "rap", "tended", "cumbersome", "simpering", "stirring", "songs", "italian-language", "throws", "blues", "piano", "beach", "outstanding", "strings", "drown", "tinny", "fish-out-of-water", "arc", "ratchets", "ear-pleasing", "unending", "soundtrack", "correct", "also", "actually", "was", "rewarding", "shouldn't", "troubling", "ecclesiastes", "interpretation", "version", "without", "becoming", "marvel", "ensnared", "insultingly", "unbelievable", "old-fashioned", "crisis", "stereotyped", "ensures", "hole-ridden", "legitimate", "plotting", "provocative", "nothing", "leave", "hollywood", "obviously", "match", "commercial", "enjoy", "ride", "five", "pretty", "summer", "unfaithful", "else", "becomes", "mediocre", "away", "happens", "sincere", "show", "happening", "something's", "forgettable", "sea", "everything", "drink", "extravaganza", "filmmaking", "revealing", "diane", "lane", "compared", "fresh", "whatsoever", "wonderful", "audience", "belt", "phony", "represents", "offering", "savage", "garden", "children", "happen", "hadn't", "popcorn", "add", "desperately", "appeal", "pleasant", "relatively", "contrived", "tepid", "convenient", "ambiguous", "masterpiece", "raunchy", "cipher", "schwarzenegger", "started", "horror", "sexy", "reveal", "graphic", "dana", "carvey", "deep", "formula", "zone", "suggests", "interested"]
while line:
    splitted = line.split(' ')
    if splitted[1] in all_words:
        print("  { \"" + splitted[0][:5] + '": ' + splitted[0][6] + ', "target": "' + splitted[1] + '" },')
        all_words.remove(splitted[1])
    line = fp.readline()

print("];")

fp.close()