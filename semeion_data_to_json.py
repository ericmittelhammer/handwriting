import json

testrecords = []

with open("./semeion/semeion.data.txt") as f:
	for line in f:
		data = line.split(" ")
		testrecord = {'input': map(lambda x: int(float(x)), data[:256]), 'output': map(lambda x: int(x), data[256:-1])}
		testrecords.append(testrecord)

with open("./testdata/semeion_testset.json", "w") as t:
	t.write(json.dumps(testrecords))
