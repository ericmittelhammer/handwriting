import json

testrecords = []

with open("./rawdata/optdigits.tes") as f:
	for line in f:
		atts = line.split(",")
		atts.reverse()
		testrecord = {'input':[], 'output':{}}
		for x in xrange(0,64):
			testrecord['input'].append(int(atts.pop()))
		output = atts.pop()
		for o in xrange(0,10):
			testrecord["output"][o] = 1 if o == int(output) else 0
		testrecords.append(testrecord)

with open("./testdata/testset.json", "w") as t:
	t.write(json.dumps(testrecords))
