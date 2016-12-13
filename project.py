#!/usr/bin/python

from flask import Flask
from flask import request
import matlab.engine
import psycopg2
import os
import sys

app = Flask(__name__)



def start_program(img_link, height_in, width_in, num_colors):

	eng = matlab.engine.start_matlab()

	eng.addpath(r'm_files', nargout=0)
	eng.workspace['img_url'] = img_url
	eng.eval("img = imread(img_url, 'jpg');", nargout=0)
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



@app.route('/create', methods=['GET'])
def create():
	img_link = str(request.get(''))
	height = float(request.get(''))
	width = float(request.get(''))
	num_colors = float(request.get(''))
	fabric_count = float(request.get(''))
	image = start_program(img_link, height*fabric_count, width*fabric_count, num_colors)
	return image


if __name__ == '__main__':
	app.run()






