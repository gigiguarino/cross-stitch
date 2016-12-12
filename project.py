from flask import Flask, requests, send_file
import matlab.engine
import os
import sys
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route('/')
def start_program():
	img_url = request.args.get('img_url', 0, type=str)
	height = request.args.get('height', 0, type=int)
	width = request.args.get('width', 0, type=int)
	num_colors = request.args.get('num-colors', 0, type=int)
	fabric_count = request.args.get('fabric-count', 0, type=int)
	symbols = request.args.get('symbol-enable', 0, type=int)
	boxes = request.args.get('color-enable', 0, type=int)

	height = height*fabric_count
	width = width*fabric_count



	eng = matlab.engine.start_matlab()

	eng.addpath(r'~/Documents/EECS351/project/m_files', nargout=0)
	eng.workspace['img_url'] = img_url
	eng.eval('')
	eng.eval("img = imread('pikachu.jpg');", nargout=0)
	eng.eval("sizes = size(img);", nargout=0)
	eng.eval("h = sizes(1);", nargout=0)
	eng.eval("w = sizes(2);", nargout=0)
	img_height = eng.workspace['h']
	img_width = eng.workspace['w']

	if (img_height > 300):
		eng.eval("img = imresize(img, 300/h);", nargout=0)
		eng.eval("sizes = size(img);", nargout=0)
		eng.eval("h = sizes(1);", nargout=0)
		eng.eval("w = sizes(2);", nargout=0)
		img_height = eng.workspace['h']
		img_width = eng.workspace['w']

	if (img_width > 300):
		eng.eval("img = imresize(img, 300/w);", nargout=0)
		eng.eval("sizes = size(img);", nargout=0)
		eng.eval("h = sizes(1);", nargout=0)
		eng.eval("w = sizes(2);", nargout=0)
		img_height = eng.workspace['h']
		img_width = eng.workspace['w']


	ratio = img_height / img_width

	if (ratio > 0):
		# img height is greater than width
		new_height = height
		x = height/img_height
		new_width = round(img_width * x)
	else:
		# img width is greater than height
		new_width = width
		x = width/img_width 
		new_height = round(img_height * x)


	eng.workspace['new_height'] = new_height
	eng.workspace['new_width'] = new_width
	eng.workspace['num_colors'] = num_colors
	eng.eval("cross_stitch(img, new_height, new_width, num_colors);", nargout=0)

	print "\n"
	print "Finished"
	print "Cross stitch image is saved in directory as 'output.jpg'"
	print "Symbol image is saved in directory as 'symbols.txt'\n\n"

	return send_file('output.jpg', mimetype='image/jpeg')


if __name__ == '__main__':
	app.run()