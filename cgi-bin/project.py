#!/usr/bin/python

from flask import Flask, send_file
import matlab.engine
import os
import cgitb; cgitb.enable()
from wsgiref.handlers import CGIHandler
import sys
import traceback
import matplotlib.pyplot as plt

app = Flask(__name__)


@app.route('/')
def start_program():
	img_url = params['img-link']
	height = params['height']
	width = params['width']
	num_colors = params['num-colors']
	fabric_count = params['fabric-count']

	height = height*fabric_count
	width = width*fabric_count

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

	#print "\n"
	#print "Finished"
	#print "Cross stitch image is saved in directory as 'output.jpg'"
	#print "Symbol image is saved in directory as 'symbols.txt'\n\n"

	return send_file('output.jpg', mimetype='image/jpeg')


if __name__ == '__main__':
	app.run()



